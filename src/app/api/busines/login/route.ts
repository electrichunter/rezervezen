// src/app/api/business/login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs' // bcryptjs ile şifre doğrulama

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { business_mail, business_password } = body

  // Gerekli alanlar
  if (!business_mail || !business_password) {
    return NextResponse.json(
      { error: 'E-posta ve şifre gereklidir' },
      { status: 400 }
    )
  }

  // E-posta ile işletmeyi bulma
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('business_mail', business_mail)
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: 'E-posta adresiyle kayıtlı işletme bulunamadı' },
      { status: 404 }
    )
  }

  // Şifreyi doğrulama
  const isPasswordValid = await bcrypt.compare(business_password, data.business_password)

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'Geçersiz şifre' },
      { status: 401 }
    )
  }

  // Başarılı giriş sonrası verileri döndürme
  return NextResponse.json(
    { message: 'Başarıyla giriş yapıldı', business: data },
    { status: 200 }
  )
}
