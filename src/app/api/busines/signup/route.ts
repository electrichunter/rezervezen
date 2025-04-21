// src/app/api/business/register/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'  // npm install bcryptjs

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { business_name, business_mail, business_address, business_password } = body

  // Gerekli alanlar
  if (!business_name || !business_mail || !business_password) {
    return NextResponse.json(
      { error: 'İsim, mail ve şifre zorunlu' },
      { status: 400 }
    )
  }

  // Şifre uzunluğu kontrolü
  if (business_password.length < 6) {
    return NextResponse.json(
      { error: 'Şifre en az 6 karakter olmalı' },
      { status: 400 }
    )
  }

  // Şifreyi hash’le
  const hashedPassword = await bcrypt.hash(business_password, 10)

  // Veritabanına ekle
  const { data, error } = await supabase
    .from('businesses')
    .insert([{
      business_name,
      business_mail,
      business_address,
      business_password: hashedPassword,
    }])

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { message: 'İşletme başarıyla kaydedildi', data },
    { status: 201 }
  )
}
