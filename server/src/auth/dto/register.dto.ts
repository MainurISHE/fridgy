
import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email().trim().toLowerCase(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be at most 128 characters')
      .refine(
        (value) => value.trim().length > 0,
        'Password cannot contain only whitespace',
      ),

    displayName: z
      .string()
      .trim()
      .min(2, 'Display name must be at least 2 characters')
      .max(100, 'Display name must be at most 100 characters')
      .optional(),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
