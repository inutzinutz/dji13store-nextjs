import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { OrganizationJsonLd } from "@/components/ui/JsonLd";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: {
    default: "DJI13Store — ตัวแทนจำหน่าย DJI อย่างเป็นทางการ",
    template: "%s | DJI13Store",
  },
  description: "ร้านจำหน่ายสินค้า DJI อย่างเป็นทางการ โดรน กล้อง Gimbal ครบครัน บริการดี มีประกัน",
  keywords: ["DJI", "โดรน", "drone", "DJI Mini", "DJI Air", "DJI Mavic", "กล้อง DJI", "dji13store"],
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.dji13store.com",
    siteName: "DJI13Store",
    title: "DJI13Store — ตัวแทนจำหน่าย DJI อย่างเป็นทางการ",
    description: "ร้านจำหน่ายสินค้า DJI อย่างเป็นทางการ โดรน กล้อง Gimbal ครบครัน",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJI13Store",
    description: "ตัวแทนจำหน่าย DJI อย่างเป็นทางการ",
  },
  alternates: {
    canonical: "https://www.dji13store.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${sarabun.variable} font-sans antialiased bg-background text-foreground`}>
        <OrganizationJsonLd />
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
