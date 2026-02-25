import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เช่าโดรน | Drone Rental Service - DJI 13 Store",
  description:
    "บริการเช่าโดรน DJI และ Altura สำหรับงานสำรวจ ถ่ายภาพมุมสูง ตรวจสอบโครงสร้าง และอีเวนต์ พร้อมนักบินมืออาชีพ",
  keywords: [
    "เช่าโดรน",
    "drone rental",
    "เช่าโดรน DJI",
    "บริการโดรน",
    "drone service Thailand",
    "เช่าโดรนสำรวจ",
    "เช่าโดรนถ่ายภาพ",
  ],
  openGraph: {
    title: "เช่าโดรน | Drone Rental Service",
    description:
      "บริการเช่าโดรน DJI และ Altura สำหรับงานสำรวจ ถ่ายภาพมุมสูง ตรวจสอบโครงสร้าง พร้อมนักบินมืออาชีพ",
    url: "https://www.dji13store.com/drone-rental",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/drone-rental",
  },
};

export default function DroneRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
