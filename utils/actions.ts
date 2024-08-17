'use server';

import { hash } from 'bcryptjs';
import { userSchema, validateWithZodSchema } from './schemas';
import db from './db';

export const renderError = (error: unknown) => {
  console.log('error:', error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

type UserFields = {
  name: string;
  email: string;
  password: string;
  confirmation?: string;
};

export const userAlreadyExists = async (user: UserFields) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return null;
  }
};

export const createUserAction = async (prevState: any, formData: FormData) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields: UserFields = validateWithZodSchema(
      userSchema,
      rawData
    );

    const userExists = await userAlreadyExists(validatedFields);
    if (userExists) {
      return {
        message: 'User exists with provided email.',
      };
    } else if (userExists === null) {
      return {
        message: 'An error occurred verifying user.',
      };
    }

    delete validatedFields.confirmation;
    const hashedPassword = await hash(validatedFields.password, 10);

    await db.user.create({
      data: {
        ...validatedFields,
        password: hashedPassword,
      },
    });

    //
    // LOG IN (context ? )

    return { message: 'Created User Successfully' };
  } catch (error) {
    return renderError(error);
  }
};
