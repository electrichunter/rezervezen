import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu  from "./component/ul/nav-header"; // component yazılmalı
 

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
     



      >
        {children}
      </body>
    </html>
  );
}
