"use client"; // Bu satırı ekledik

import React from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/src/app/component/ul/home/buttons";
import { Badge } from "@/src/app/component/ul/home/badge";

function Hero() {
  return (
    <div className="w-full py-12 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-14 items-center md:grid-cols-2">
          {/* Sol Kısım */}
          <div className="flex flex-col gap-6">
            <Badge className="w-1/9" variant="outline">Sizin için!</Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-left tracking-tight">
              Bu, yepyeni bir başlangıç!
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md text-left">
              Küçük bir işletmeyi yönetmek zaten yeterince zor. Eski ve karmaşık yöntemlerle zaman kaybetmeyin. Amacımız, işleri sizin için hızlı ve kolay hale getirmek.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"  
                onClick={() => window.open('https://wa.me/905000000000?text=Merhaba, size nasıl yardımcı olabilirim?', '_blank')} 
                variant="outline" 
                className="gap-2"
              >
                Hemen Görüşelim <PhoneCall className="w-4 h-4" />
              </Button>
             
            </div>
          </div>

          {/* Sağ Kısım - Placeholder'lar renkli, yarı saydam ve estetik */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl aspect-square w-full h-full bg-blue-500 bg-opacity-20"></div>
            <div className="rounded-xl row-span-2 h-full bg-purple-500 bg-opacity-20"></div>
            <div className="rounded-xl aspect-square w-full h-full bg-green-500 bg-opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
