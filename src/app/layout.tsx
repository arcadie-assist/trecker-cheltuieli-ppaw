import "./globals.css";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import ExpensesAside from "@/components/ExpensesAside";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track and manage your expenses with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col w-screen h-screen bg-gray-100 p-8">
          <div className="flex-1 flex w-full max-w-screen-lg mx-auto gap-2">
            <main className="flex-1 bg-white rounded-md overflow-hidden">
              <Navbar />
              {children}
            </main>
            <ExpensesAside />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
