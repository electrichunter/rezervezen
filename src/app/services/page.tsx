"use client";

import React from "react";
import NavHeader from "../component/ul/nav-header";
import { Wrench, Cpu, Smartphone } from "lucide-react";

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <Icon className="w-12 h-12 text-rose-300 mb-4" />
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <NavHeader />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Rezervasyon Sistemimiz
        </h1>
<br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={Wrench}
            title="Özel Çözümler"
            description="İşletmenizin ihtiyaçlarına göre özelleştirilmiş rezervasyon çözümleri sunuyoruz. Sizin için en uygun sistemle zaman kaybetmeden rezervasyon alabilirsiniz."
          />
          <ServiceCard
            icon={Cpu}
            title="Yüksek Performans"
            description="Güvenli, hızlı ve sorunsuz çalışan altyapımızla, müşteri taleplerinizi en hızlı şekilde karşılayın."
          />
          <ServiceCard
            icon={Smartphone}
            title="Mobil Uyumlu"
            description="Her cihazda mükemmel çalışan arayüzümüzle, müşterilerinizin her zaman erişebileceği bir rezervasyon sistemi."
          />
        </div>
      </main>
    </div>
  );
}
