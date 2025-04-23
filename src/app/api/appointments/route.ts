import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';



// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);




// Randevu oluşturma
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { business_id, appointment_time, notes } = body;

  if (!business_id || !appointment_time) {
    return NextResponse.json(
      { error: 'business_id ve appointment_time gereklidir.' },
      { status: 400 }
    );
  }

  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token is required in the Bearer format.' },
      { status: 401 }
    );
  }

  const { data: user, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user?.user) {
    return NextResponse.json(
      { error: 'Geçersiz kullanıcı.' },
      { status: 401 }
    );
  }

  const { id: user_id } = user.user;

  const { data, error } = await supabase
    .from('appointments')
    .insert([{ user_id, business_id, appointment_time, notes }])
    .select();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data }, { status: 201 });
};




// Randevuları listeleme
export const GET = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token is required in the Bearer format.' },
      { status: 401 }
    );
  }

  const { data: user, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user?.user) {
    return NextResponse.json(
      { error: 'Geçersiz kullanıcı.' },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.user.id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
};
  






export const DELETE = async (req: NextRequest) => {
  const { appointment_id } = await req.json();

  if (!appointment_id) {
    return NextResponse.json(
      { error: 'appointment_id gereklidir.' },
      { status: 400 }
    );
  }

  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token is required in the Bearer format.' },
      { status: 401 }
    );
  }

  const { data: user, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user?.user) {
    return NextResponse.json(
      { error: 'Geçersiz kullanıcı.' },
      { status: 401 }
    );
  }

  const { error } = await supabase
    .from('appointments')
    .update({ is_deleted: true })  // 'is_deleted' alanını true yapıyoruz
    .eq('id', appointment_id)
    .eq('user_id', user.user.id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Randevu iptal edildi.' }, { status: 200 });
};
