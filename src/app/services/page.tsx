"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Menu from "../component/ul/nav-header";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../component/ul/card/services_card";

type Service = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

const services: Service[] = [
  {
    title: "Randevu Yönetimi",
    description:
      "Kolayca randevu oluşturun, iptal edin veya güncelleyin. Zamanınızı daha verimli yönetin.",
    icon: "📅",
    href: "/services/appointments",
  },
  {
    title: "İşletme Profili Oluşturma",
    description:
      "Detaylı işletme profili ile müşterilerinize en iyi ilk izlenimi sunun.",
    icon: "🏢",
    href: "/services/busines_register",
  },
  {
    title: "Analitik ve Raporlama",
    description:
      "Gerçek zamanlı verilerle randevu performansınızı takip edip iyileştirin.",
    icon: "📊",
    href: "/services/analytics",
  },
  {
    title: "Hatırlatma Bildirimleri",
    description:
      "E-posta ve SMS ile otomatik hatırlatma göndererek katılım oranını artırın.",
    icon: "🔔",
    href: "/services/notifications",
  },
  {
    title: "Ödeme Entegrasyonu",
    description:
      "Güvenli ödeme seçenekleriyle müşterilerinizin işlemlerini zahmetsizce yönetin.",
    icon: "💳",
    href: "/services/payments",
  },
  {
    title: "Çoklu Konum Desteği",
    description:
      "Birden fazla şubeyi tek platformdan kolayca yönetin.",
    icon: "📍",
    href: "/services/locations",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesPage() {
  return (
   <>
   
    <section
      role="region"
      aria-labelledby="services-heading"
      className="bg-amber-50 dark:bg-gray-900 min-h-screen py-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          id="services-heading"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-black dark:text-white"
        >
          Hizmetlerimiz
        </motion.h1>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {services.map((service) => (
            <motion.li
              key={service.title}
              variants={itemVariants}
              role="listitem"
            >
              <Link href={service.href} passHref>
                <Card className="cursor-pointer transition-shadow hover:shadow-xl">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    aria-labelledby={`${service.title}-title`}
                  >
                    <CardHeader>
                      <CardTitle
                        id={`${service.title}-title`}
                        className="flex items-center gap-3 text-2xl text-black dark:text-white"
                      >
                        <span className="text-3xl">{service.icon}</span>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 dark:text-gray-300">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </motion.div>
                </Card>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
    </>
  );
}
