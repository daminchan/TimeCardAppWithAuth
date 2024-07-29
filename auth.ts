import { getUserByEmail } from "@/features/auth/lib/user";
import { signInSchema } from "@/lib/schemas";
import { authConfig } from "@/auth.config";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
});
// import NextAuth, { NextAuthConfig } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";

// export const config: NextAuthConfig = {
//   providers: [Github],
//   basePath: "/api/auth",
//   callbacks: {
//     authorized({ request, auth }) {
//       try {
//         const { pathname } = request.nextUrl;
//         if (pathname === "/protected-page") return !!auth;
//         return true;
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     jwt({ token, trigger, session }) {
//       if (trigger === "update") token.name = session?.user?.name;
//       return token;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(config);
