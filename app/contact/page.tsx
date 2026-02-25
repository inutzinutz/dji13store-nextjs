import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "ติดต่อเรา | DJI13Store",
  description:
    "ติดต่อ DJI13Store สอบถามสินค้า ราคา และบริการ ผ่านทาง LINE โทรศัพท์ หรือเยี่ยมชมร้านสาขาลาดพร้าวและราชพฤกษ์",
};

const branches = [
  {
    name: "สาขาลาดปลาเค้า (ลาดพร้าว)",
    address:
      "616/6 หมู่บ้านเดอะ พาร์ที ถนนลาดปลาเค้า แขวงจรเข้บัว เขตลาดพร้าว กรุงเทพมหานคร 10230",
    phone1: "089-450-0055",
    phone1href: "tel:+66894500055",
    phone2: "02-789-4925",
    phone2href: "tel:+6627894925",
    mapSrc:
      "https://maps.google.com/maps?q=616%2F6+%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0+%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%97%E0%B8%B5+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%B2+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%9A%E0%B8%B1%E0%B8%A7+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A7+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10230&t=m&z=15&output=embed&iwloc=near",
  },
  {
    name: "สาขาราชพฤกษ์ (ตลิ่งชัน)",
    address:
      "14/2 หมู่ 20 ถนนราชพฤกษ์ แขวงบางระมาด เขตตลิ่งชัน กรุงเทพมหานคร 10170",
    phone1: "065-694-6155",
    phone1href: "tel:+66656946155",
    phone2: "02-789-4925",
    phone2href: "tel:+6627894925",
    mapSrc:
      "https://maps.google.com/maps?q=14%2F2+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9E%E0%B8%A4%E0%B8%81%E0%B8%A9%E0%B9%8C+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%95%E0%B8%A5%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B1%E0%B8%99+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10170&t=m&z=15&output=embed&iwloc=near",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="section-label mb-3">
           <span className="w-4 h-px bg-primary inline-block" />
          ติดต่อเรา
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">ติดต่อ DJI13Store</h1>
        <p className="text-muted-foreground max-w-lg">
          ทีมงานพร้อมให้คำปรึกษาและตอบคำถามทุกวัน ไม่ว่าจะเป็นเรื่องสินค้า ราคา หรือการสั่งซื้อ
        </p>
      </div>

      {/* Quick contact channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <a
          href="tel:+66894500055"
          className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Phone size={22} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">สาขาลาดพร้าว</p>
            <p className="text-primary font-medium text-sm">089-450-0055</p>
            <p className="text-muted-foreground text-xs">02-789-4925</p>
          </div>
        </a>

        <a
          href="tel:+66656946155"
          className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Phone size={22} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">สาขาราชพฤกษ์</p>
            <p className="text-primary font-medium text-sm">065-694-6155</p>
            <p className="text-muted-foreground text-xs">02-789-4925</p>
          </div>
        </a>

        <a
          href="https://line.me/ti/p/~@dji13store"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-green-500/30 transition-all group"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors shrink-0">
            <MessageCircle size={22} className="text-green-500" />
          </div>
          <div>
            <p className="font-semibold text-foreground">LINE Official</p>
            <p className="text-green-600 font-medium text-sm">@dji13store</p>
            <p className="text-muted-foreground text-xs">ตอบกลับรวดเร็ว ทุกวัน</p>
          </div>
        </a>
      </div>

      {/* Hours */}
      <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800 mb-12 max-w-md">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
          <Clock size={22} className="text-amber-600" />
        </div>
        <div>
          <p className="font-semibold text-foreground">เวลาทำการ</p>
          <p className="text-muted-foreground text-sm">
            จันทร์ – อาทิตย์ และวันหยุดนักขัตฤกษ์
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            09:30 น. – 18:30 น.
          </p>
        </div>
      </div>

      {/* Branch details with map */}
      <div className="space-y-10">
        {branches.map((b) => (
          <div
            key={b.name}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground mb-1">
                DJI Official Online Store — {b.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-primary" />
                  {b.address}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <a
                  href={b.phone1href}
                  className="flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
                >
                  <Phone size={14} /> {b.phone1}
                </a>
                <a
                  href={b.phone2href}
                  className="flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
                >
                  <Phone size={14} /> {b.phone2}
                </a>
              </div>
            </div>
            <div className="w-full h-64">
              <iframe
                src={b.mapSrc}
                title={b.name}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="mt-12 bg-card rounded-2xl border border-border shadow-sm p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-foreground mb-5">
          ส่งข้อความหาเรา
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              placeholder="กรอกชื่อของคุณ"
              className="w-full border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              placeholder="08X-XXX-XXXX"
              className="w-full border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              อีเมล (ถ้ามี)
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              สินค้าที่สนใจ / ข้อความ
            </label>
            <textarea
              rows={4}
              placeholder="เช่น สนใจ DJI Mini 4 Pro ต้องการทราบราคาและของแถม..."
              className="w-full border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors"
          >
            ส่งข้อความ
          </button>
          <p className="text-xs text-muted-foreground text-center">
            หรือติดต่อผ่าน{" "}
            <a
              href="https://line.me/ti/p/~@dji13store"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINE @dji13store
            </a>{" "}
            เพื่อรับการตอบกลับที่รวดเร็วกว่า
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}
