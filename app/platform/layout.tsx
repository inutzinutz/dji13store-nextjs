import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "แพลตฟอร์มบริหารจัดการโดรน | Drone Management Platform - DJI 13 Store",
  description:
    "แพลตฟอร์มบริหารจัดการฝูงบินโดรนแบบครบวงจร รองรับ AI วิเคราะห์ข้อมูล การวางแผนเส้นทางบินอัตโนมัติ และรายงานผลแบบเรียลไทม์",
  keywords: [
    "Drone Management Platform",
    "แพลตฟอร์มโดรน",
    "AI drone analytics",
    "fleet management",
    "DJI FlightHub",
    "ระบบจัดการโดรน",
  ],
  openGraph: {
    title: "แพลตฟอร์มบริหารจัดการโดรน | Drone Management Platform",
    description:
      "แพลตฟอร์มบริหารจัดการฝูงบินโดรนแบบครบวงจร รองรับ AI วิเคราะห์ข้อมูล",
    url: "https://www.dji13store.com/platform",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/platform",
  },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
