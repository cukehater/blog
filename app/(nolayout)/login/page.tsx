import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto p-8 bg-[--tertiary-color] rounded-lg">
        <form
          action={async (formData) => {
            'use server'
            try {
              await signIn('credentials', formData)
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`/error?error=${error.type}`)
              }
              throw error
            }
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="id" className="block text-sm font-medium">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent-color] focus:border-[--accent-color] text-[--primary-color]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent-color] focus:border-[--accent-color] text-[--primary-color]"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 text-sm px-4 border border-transparent rounded-md shadow-sm font-bold text-[--primary-color] bg-[--accent-color] hover:bg-[--accent-color-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--accent-color] transition-colors duration-200"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}
