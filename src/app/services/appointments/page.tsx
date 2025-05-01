"use client";

import Menu from "../../component/ul/nav-header";
import AppointmentsForm from "../../component/ul/appointments/appointments_form";

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center py-1">
     
      <AppointmentsForm />
    </div>
  );
}
