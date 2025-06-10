import CredentialsProvider from 'next-auth/providers/credentials'
import { randomUUID, randomBytes } from 'crypto'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  /* providers */
  providers: [
    // ユーザ用認証
    CredentialsProvider({
      id: 'user',
      name: 'User',
      credentials: {
        email: { label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const user = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      },
    }),
  ],

  /* callbacks */
  callbacks: {
    async jwt({ token, user }) {
    // 初回ログイン時のみ user が存在する
    if (user) {
      token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = session.user ?? {};
        session.user.id = token.id as number;
      }
      return session
    }
  },

  /* secret */
  secret: process.env.NEXTAUTH_SECRET,

  /* jwt */
  jwt: {
    maxAge: 120 * 60,
  },

  /* session */
  session: {
    maxAge: 120 * 60,      // 120分（2時間）でセッションが無効に
    updateAge: 24 * 60 * 60,        // 24時間
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  }
}
