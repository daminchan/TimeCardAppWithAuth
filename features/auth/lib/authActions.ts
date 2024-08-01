"use server";

import { getUserByEmail } from "@/features/auth/lib/user";
import { signUpSchema } from "@/lib/schemas";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/globals/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力項目が足りません。",
    };
  }

  const { email, password, name, role } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        message: "既に登録されているユーザーです。",
      };
    }

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: role,
      },
    });
  } catch (error) {
    throw error;
  }

  redirect("/auth/login");
}

export async function login(prevState: string | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "入力情報に間違いがあります.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
  // redirect("/");
}

// export async function login(prevState: string | undefined, formData: FormData) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "入力情報に間違いがあります.";
//         default:
//           return "Something went wrong.";
//       }
//     }

//     throw error;
//   }
// }

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
