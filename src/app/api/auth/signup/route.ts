import { NextResponse } from 'next/server'
import { signUp } from '@/src/app/api/auth/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const { data, error } = await signUp(email, password)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
 