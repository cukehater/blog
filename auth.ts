import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import type { Provider } from 'next-auth/providers'

const providers: Provider[] = [Google]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== 'credentials')

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // credentials 객체에 키를 추가하여 제출해야 할 필드들을 지정할 수 있습니다.
      // 예: 도메인, 사용자명, 비밀번호, 2단계 인증 토큰 등
      credentials: {
        id: {},
        password: {}
      },
      authorize: async (credentials) => {
        let user = null

        // 비밀번호 솔트 처리 및 해시 로직
        // const pwHash = saltAndHashPassword(credentials.password)

        // 사용자 존재 여부 확인 로직
        // user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // 사용자를 찾을 수 없음, 첫 로그인 시도
          // 선택적으로 여기서 사용자 등록을 수행할 수 있습니다
          throw new Error('Invalid credentials.')
        }

        // 사용자 프로필 데이터와 함께 사용자 객체 반환
        return user
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      // addUser({
      //   id: account?.providerAccountId.toString() as string,
      //   name: user.name || '',
      //   image: user.image,
      //   email: user.email,
      //   username: user.email?.split('@')[0]
      // })

      return true
    },
    async session({ session }) {
      const user = session.user
      // if (user) {
      //   session.user = {
      //     ...user,
      //     username: user.email!.split('@')[0]
      //   }
      // }

      return session
    }
  },
  pages: {
    signIn: '/auth/signIn'
  }
})
