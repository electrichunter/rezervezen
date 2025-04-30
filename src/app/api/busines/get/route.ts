import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const GET = async () => {
  try {
    // Tabloyu ve kolonları kontrol et
    const { data, error } = await supabase
      .from("businesses") // Tablo adı doğru
      .select("id, business_name"); // 'business_name' kolonunu kullan

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.warn("Veri bulunamadı.");
      return NextResponse.json({ error: "İşletme verisi bulunamadı." }, { status: 404 });
    }

    console.log("API'den dönen veri:", data); // Veriyi terminale yazdır

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected Error:", err.message);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
};
