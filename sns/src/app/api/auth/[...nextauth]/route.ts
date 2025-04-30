import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("メールアドレスとパスワードを入力してください");
        }

        const user = await prisma.users.findUnique({
          where: { mail: credentials.email }, // ← カラム名注意
        });

        if (!user) {
          throw new Error("メールアドレスが見つかりません");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("パスワードが正しくありません");
        }

        return {
          id: user.id.toString(), // idはstringで返す
          name: user.username,
          email: user.mail,
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/logout/login",
  },
});

export { handler as GET, handler as POST };
