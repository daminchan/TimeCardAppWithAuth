import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    name: string;
  }

  interface JWT {
    id: string;
    role: string;
    name: string;
  }
}
