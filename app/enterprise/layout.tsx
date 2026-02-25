import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJI Enterprise Solutions | โดรนสำหรับองค์กร - DJI 13 Store",
  description:
    "โซลูชันโดรนระดับองค์กรจาก DJI สำหรับงานสำรวจ ตรวจสอบโครงสร้าง ความปลอดภัย และอุตสาหกรรม พร้อมบริการให้คำปรึกษาและฝึกอบรม",
  keywords: [
    "DJI Enterprise",
    "โดรนองค์กร",
    "โดรนสำรวจ",
    "โดรนตรวจสอบ",
    "DJI Matrice",
    "DJI Dock",
    "Enterprise drone Thailand",
  ],
  openGraph: {
    title: "DJI Enterprise Solutions | โดรนสำหรับองค์กร",
    description:
      "โซลูชันโดรนระดับองค์กรจาก DJI สำหรับงานสำรวจ ตรวจสอบโครงสร้าง ความปลอดภัย และอุตสาหกรรม",
    url: "https://www.dji13store.com/enterprise",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/enterprise",
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
