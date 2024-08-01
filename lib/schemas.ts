// import { z } from "zod";

// export const signUpSchema = z.object({
//   email: z.string().email({
//     message: "メールアドレスを入力してください。",
//   }),
//   password: z.string().min(1, {
//     message: "パスワードを入力してください。",
//   }),
// });

// export const signInSchema = z.object({
//   email: z.string().email({
//     message: "メールアドレスを入力してください。",
//   }),
//   password: z.string().min(1, {
//     message: "パスワードを入力してください。",
//   }),
// });
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください。",
  }),
  password: z.string().min(1, {
    message: "パスワードを入力してください。",
  }),
  name: z.string().min(1, {
    message: "名前を入力してください。",
  }),
  role: z.string().min(1, {
    message: "ロールを入力してください。",
  }),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください。",
  }),
  password: z.string().min(1, {
    message: "パスワードを入力してください。",
  }),
});
