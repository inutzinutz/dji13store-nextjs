import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "กรณีศึกษาโดรน | Drone Case Studies - DJI 13 Store",
  description:
    "กรณีศึกษาการใช้งานโดรนจริงในอุตสาหกรรมไทย ตั้งแต่การสำรวจพื้นที่เกษตร ตรวจสอบโครงสร้าง จนถึงการรักษาความปลอดภัย",
  keywords: [
    "กรณีศึกษาโดรน",
    "drone case studies",
    "โดรนในอุตสาหกรรม",
    "drone Thailand",
    "ตัวอย่างการใช้โดรน",
    "DJI use case",
  ],
  openGraph: {
    title: "กรณีศึกษาโดรน | Drone Case Studies",
    description:
      "กรณีศึกษาการใช้งานโดรนจริงในอุตสาหกรรมไทย",
    url: "https://www.dji13store.com/case-studies",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
