import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email().trim().toLowerCase(),
});

export type ForgotPasswordDto = z.infer<
  typeof forgotPasswordSchema
>;