import { z, ZodSchema } from 'zod';

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'Name must be at least 3 characters.',
      })
      .max(20, {
        message: 'Name cannot be more than 20 characters.',
      }),
    email: z.string().email({
      message: 'Email is required and must be a valid email.',
    }),
    password: z.string().min(4, {
      message: 'Password must be at least 4 characters.',
    }),
    confirmation: z.string().min(4, {
      message: 'Confirmation must match Password.',
    }),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'Password and Confirmation must match',
    path: ['password', 'confirmation'],
  });

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
