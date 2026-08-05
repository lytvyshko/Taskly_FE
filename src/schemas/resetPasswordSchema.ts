import { z } from 'zod';
import { passwordSchema } from '@/schemas/signUpSchema.ts';

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,

    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'Passwords do not match',
    path: ['repeatNewPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
