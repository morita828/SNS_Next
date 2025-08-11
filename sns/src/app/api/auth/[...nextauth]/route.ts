import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("メールアドレスとパスワードを入力してください");
        }

        // Prismaでユーザーをメールアドレスで検索
        const user = await prisma.users.findUnique({
          where: { mail: credentials.email },
        });

        if (!user) {
          throw new Error("メールアドレスが見つかりません");
        }

        // bcryptでパスワード検証
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new Error("パスワードが正しくありません");
        }

        // 認証成功時はユーザー情報を返す（ここで返した値がsession.userなどに入る）
        return {
          id: user.id,
          name: user.username,
          email: user.mail,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/logout/login",
  },
  callbacks: {
    // JWTトークンにユーザーIDを保存
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // セッションにユーザーIDをセット
    async session({ session, token }) {
      if (token?.id) {
        session.user = session.user ?? {};
        session.user.id = token.id as number;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
