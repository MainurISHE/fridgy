import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),

  password: z.string().min(8).max(128),

  displayName: z.string().trim().min(2).max(100).optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;