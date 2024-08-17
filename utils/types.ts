import { User } from '@prisma/client';

export type NewUserType = {
  name: string;
  email: string;
  password: string;
};

export type ActionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
