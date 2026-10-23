import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { PasswordResetToken } from '../database/entities/password-reset-token.entity.js';
import { RevokedToken } from '../database/entities/revoked-token.entity.js';
import { UsersService } from '../users/users.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import { MailService } from '../mail/mail.service.js';

const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,

    @InjectRepository(RevokedToken)
    private readonly revokedTokens: Repository<RevokedToken>,

    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokens: Repository<PasswordResetToken>,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);

    try {
      const user = await this.usersService.create({
        email: dto.email,
        passwordHash,
        displayName: dto.displayName,
      });

      return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      jti: randomUUID(),
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    };
  }

  async logout(payload: { jti: string; exp: number }) {
    if (!payload.jti || !payload.exp) {
      throw new UnauthorizedException('Invalid access token');
    }

    const existing = await this.revokedTokens.findOne({
      where: { tokenId: payload.jti },
    });

    if (!existing) {
      await this.revokedTokens.save(
        this.revokedTokens.create({
          tokenId: payload.jti,
          expiresAt: new Date(payload.exp * 1000),
        }),
      );
    }

    return { message: 'Logged out successfully' };
  }

  async isTokenRevoked(tokenId: string): Promise<boolean> {
    return this.revokedTokens.exists({
      where: { tokenId },
    });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const rawToken = randomBytes(32).toString('hex');

      const tokenHash = createHash('sha256').update(rawToken).digest('hex');

      await this.passwordResetTokens.delete({
        userId: user.id,
      });

      await this.passwordResetTokens.save(
        this.passwordResetTokens.create({
          userId: user.id,
          tokenHash,
          expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
          usedAt: null,
        }),
      );

      
      await this.mailService.sendPasswordResetEmail(user.email, rawToken);
    }

    return {
      message:
        'If an account with this email exists, password reset instructions will be sent.',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const resetRecord = await this.passwordResetTokens.findOne({
      where: { tokenHash },
    });

    if (
      !resetRecord ||
      resetRecord.usedAt ||
      resetRecord.expiresAt.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }

    const user = await this.usersService.findById(resetRecord.userId);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }

    await this.passwordResetTokens.manager.transaction(async (manager) => {
      const lockedToken = await manager
        .createQueryBuilder(PasswordResetToken, 'token')
        .setLock('pessimistic_write')
        .where('token.id = :id', { id: resetRecord.id })
        .getOne();

      if (
        !lockedToken ||
        lockedToken.usedAt ||
        lockedToken.expiresAt.getTime() <= Date.now()
      ) {
        throw new UnauthorizedException(
          'Invalid or expired password reset token',
        );
      }

      const passwordHash = await argon2.hash(newPassword);

      await manager.update(
        'users',
        { id: user.id },
        { password_hash: passwordHash },
      );

      lockedToken.usedAt = new Date();
      await manager.save(PasswordResetToken, lockedToken);
    });

    return { message: 'Password has been reset successfully' };
  }
}
