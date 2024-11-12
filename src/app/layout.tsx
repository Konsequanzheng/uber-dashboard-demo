import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { TimeProvider } from "@/contexts/TimeContext";
import { DashboardProvider } from "@/contexts/DashboardContext";

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
  title: "Uber dashboard demo",
  description: "A demo dashboard for Uber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <TimeProvider>
          <DashboardProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </DashboardProvider>
        </TimeProvider>
      </body>
    </html>
  );
}
