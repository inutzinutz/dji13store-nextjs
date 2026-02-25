import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Altura Zenith VTOL Drones | โดรน VTOL สำหรับงานสำรวจ - DJI 13 Store",
  description:
    "โดรน VTOL จาก Altura Zenith สำหรับงานสำรวจพื้นที่ขนาดใหญ่ ทำแผนที่ และงานเกษตรกรรม บินได้นานกว่า ครอบคลุมพื้นที่กว้างกว่า",
  keywords: [
    "Altura Zenith",
    "VTOL drone",
    "โดรน VTOL",
    "โดรนสำรวจ",
    "โดรนทำแผนที่",
    "fixed-wing drone",
    "โดรนเกษตร",
  ],
  openGraph: {
    title: "Altura Zenith VTOL Drones | โดรน VTOL สำหรับงานสำรวจ",
    description:
      "โดรน VTOL จาก Altura Zenith สำหรับงานสำรวจพื้นที่ขนาดใหญ่ บินได้นานกว่า ครอบคลุมพื้นที่กว้างกว่า",
    url: "https://www.dji13store.com/altura",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dji13store.com/altura",
  },
};

export default function AlturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
