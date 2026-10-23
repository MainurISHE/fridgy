
import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.email().trim().toLowerCase(),

    password: z
      .string()
      .min(1, 'Password is required')
      .max(128, 'Password must be at most 128 characters'),
  })
  .strict();

export type LoginDto = z.infer<typeof loginSchema>;
