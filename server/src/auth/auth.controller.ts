import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { registerSchema } from './dto/register.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const { BadRequestException } = await import('@nestjs/common');

      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }

    return this.authService.register(result.data);
  }
}