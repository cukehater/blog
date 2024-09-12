import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import dbConnection from './app/configs/dbConnection.ts'

interface User {
  email: string
  password: string
}

const getUserFromDb = async (
  email: string,
  password: string
): Promise<User | null> => {
  const client = dbConnection()
  const db = (await client.connect()).db('blog')
  const user = (await db
    .collection('user_cred')
    .findOne(
      { email },
      { projection: { email: 1, password: 1 } }
    )) as User | null

  if (!user) {
    return null
  }

  const passwordCheck = await bcrypt.compare(password, user.password)
  if (!passwordCheck) {
    return null
  }

  return user
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = await getUserFromDb(email, password)

        return user
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  }
})
