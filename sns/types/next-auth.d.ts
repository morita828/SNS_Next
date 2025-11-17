import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string;
    };
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string;
  }

  interface JWT {
    id: number;
  }
}
