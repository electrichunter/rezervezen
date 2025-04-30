"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Loader2 } from "lucide-react";

export default function AppointmentsForm() {
  const [busineses, setBusineses] = useState<{ id: number; name: string }[]>([]);
  const [businesId, setBusinesId] = useState<number | "">("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [businesesLoading, setBusinesesLoading] = useState(true);

  useEffect(() => {
    const fetchBusineses = async () => {
      setBusinesesLoading(true);
      try {
        const res = await fetch("/api/busines/get");
        const result = await res.json();

        const businessList = Array.isArray(result)
          ? result
          : result?.data || result?.busineses || [];

        const transformed = businessList.map((b: any) => ({
          id: b.id,
          name: b.business_name || b.name || "İsimsiz İşletme",
        }));

        setBusineses(transformed);
      } catch (error) {
        console.error("İşletmeler alınamadı:", error);
        setMessage("İşletmeler yüklenirken hata oluştu.");
      } finally {
        setBusinesesLoading(false);
      }
    };

    fetchBusineses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businesId || !appointmentTime) return;

    setLoading(true);
    setMessage("");

    const selected = busineses.find((b) => b.id === businesId);
    if (!selected) {
      setMessage("❌ Seçilen işletme bulunamadı.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          business_name: selected.name,
          appointment_time: new Date(appointmentTime).toISOString(),
          notes,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Randevu oluşturulamadı");
      }

      setMessage("✅ Randevu başarıyla oluşturuldu!");
      resetForm();
    } catch (err: any) {
      setMessage(`❌ Hata: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBusinesId("");
    setAppointmentTime("");
    setNotes("");
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-3xl border bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Yeni Randevu Oluştur</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">İşletme</label>
          <select
            value={businesId}
            onChange={(e) => setBusinesId(Number(e.target.value))}
            className="w-full bg-white text-gray-800 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
            disabled={businesesLoading}
          >
            <option value="">
              {businesesLoading ? "Yükleniyor..." : "Bir işletme seçin"}
            </option>
            {busineses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Randevu Zamanı</label>
          <div className="relative">
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full bg-white text-gray-800 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
            <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Not</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white text-gray-800 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            rows={3}
            placeholder="Eklemek istediğiniz notlar..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || businesesLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 transition duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Gönderiliyor...
            </>
          ) : (
            "Randevuyu Kaydet"
          )}
        </button>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes("✅") ? "text-green-200" : "text-red-200"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </motion.div>
  );
}
