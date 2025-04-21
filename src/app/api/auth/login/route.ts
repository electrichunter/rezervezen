import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  // Giriş yapma işlemi
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    )
  }


  
/* Aşşagudaki kod teorik olarak belirli bir email doğrulama sürecini kontrol ediyor ama şu an için yorum satırı haline getirildi */
  // Eğer email doğrulanmamışsa, doğrulama sayfasına yönlendirin


/*   // Eğer email doğrulanmamışsa, doğrulama sayfasına yönlendirin
  if (!data?.user?.confirmed_at) {
    return NextResponse.redirect('http://localhost:3000/')  // Tam URL kullanıyoruz
  } else {
    return NextResponse.redirect('http://localhost:3000/verify-email') // Tam URL kullanıyoruz
  } */

  // Başarılı giriş durumunda token ile döner
  return NextResponse.json({ data }, { status: 200 })
}
