// import bcrypt from 'bcrypt'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

// import dbConnection from '@/app/configs/dbConnection.ts'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' }
//       },

//       async authorize(credentials) {
//         const client = dbConnection()
//         const db = (await client.connect()).db('blog')

//         const user = await db
//           .collection('user_cred')
//           .findOne({ email: credentials?.email })

//         await client.close()

//         if (!user) {
//           // console.log('해당 이메일은 없음')
//           return null
//         }
//         const pwcheck = await bcrypt.compare(
//           credentials?.password,
//           user.password
//         )
//         if (!pwcheck) {
//           // console.log('비번틀림')
//           return null
//         }
//         return user
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60
//   },
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         // eslint-disable-next-line no-param-reassign
//         token.user = {}
//         // eslint-disable-next-line no-param-reassign
//         token.user.email = user.email
//       }
//       return token
//     },
//     session: async ({ session, token }) => {
//       // eslint-disable-next-line no-param-reassign
//       session.user = token.user
//       return session
//     }
//   }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }
