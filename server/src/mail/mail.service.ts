
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { type Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = Number(this.config.get<string>('SMTP_PORT', '587'));
    const user = this.config.get<string>('SMTP_USER');
    const password = this.config.get<string>('SMTP_PASSWORD');

    if (!host || !user || !password) {
      throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASSWORD must be configured');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.config
      .get<string>('FRONTEND_URL', 'http://localhost:5173')
      .replace(/\/+$/, '');

    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const from = this.config.get<string>('SMTP_USER');

    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Fridgy — password reset',
      text: [
        'We received a request to reset your Fridgy password.',
        '',
        `Open this link to set a new password: ${resetUrl}`,
        '',
        'This link expires in 15 minutes. If you did not request a reset, ignore this email.',
      ].join('\n'),
      html: `
        <h2>Reset your Fridgy password</h2>
        <p>We received a request to reset your password.</p>
        <p><a href="${resetUrl}">Set a new password</a></p>
        <p>This link expires in 15 minutes. If you did not request a reset, ignore this email.</p>
      `,
    });

    this.logger.log('Password reset email sent');
  }

  async verifyConnection(): Promise<void> {
    await this.transporter.verify();
    this.logger.log('SMTP connection verified');
  }
}
