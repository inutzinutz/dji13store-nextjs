import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โซลูชันโดรนสำหรับอุตสาหกรรม | Industry Drone Solutions - DJI 13 Store",
  description:
    "โซลูชันโดรนครบวงจรสำหรับงานอุตสาหกรรม สำรวจ ตรวจสอบโครงสร้างพื้นฐาน รักษาความปลอดภัย และการจัดการภัยพิบัติ",
  keywords: [
    "โซลูชันโดรน",
    "drone solutions",
    "โดรนอุตสาหกรรม",
    "โดรนตรวจสอบ",
    "infrastructure inspection",
    "security drone",
    "disaster response drone",
  ],
  openGraph: {
    title: "โซลูชันโดรนสำหรับอุตสาหกรรม | Industry Drone Solutions",
    description:
      "โซลูชันโดรนครบวงจรสำหรับงานอุตสาหกรรม สำรวจ ตรวจสอบโครงสร้างพื้นฐาน และรักษาความปลอดภัย",
    url: "https://www.dji13store.com/solutions",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/solutions",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
