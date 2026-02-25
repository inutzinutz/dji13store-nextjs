import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณ ROI โดรน | Drone ROI Calculator - DJI 13 Store",
  description:
    "คำนวณผลตอบแทนจากการลงทุนโดรนสำหรับองค์กร เปรียบเทียบค่าใช้จ่ายก่อนและหลังใช้โดรน พร้อมวิเคราะห์จุดคุ้มทุน",
  keywords: [
    "ROI โดรน",
    "drone ROI calculator",
    "ผลตอบแทนโดรน",
    "คำนวณค่าใช้จ่ายโดรน",
    "drone investment",
    "คุ้มทุนโดรน",
  ],
  openGraph: {
    title: "คำนวณ ROI โดรน | Drone ROI Calculator",
    description:
      "คำนวณผลตอบแทนจากการลงทุนโดรนสำหรับองค์กร เปรียบเทียบค่าใช้จ่ายก่อนและหลังใช้โดรน",
    url: "https://www.dji13store.com/roi-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/roi-calculator",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
