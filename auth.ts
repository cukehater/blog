import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import dbConnection from './app/utils/dbConnection'
import { redirect } from 'next/navigation'
import { UserType } from './app/models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: { label: 'id', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { id, password } = credentials as UserType

        const user = await getUserFromDB(id)

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          return null
        }

        return user
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 // 7일
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any
      const { id } = session.user
      session.user = { id } as any
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    }
  }
})

async function getUserFromDB(id: string): Promise<UserType | null> {
  const client = dbConnection()

  try {
    const db = client.db('blog')
    const collection = db.collection('user_cred')
    const user = (await collection.findOne(
      { id },
      { projection: { id: 1, password: 1 } }
    )) as UserType | null
    return user
  } finally {
    await client.close()
  }
}
