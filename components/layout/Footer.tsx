import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">DJI</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-xl font-bold text-gradient-brand">13 STORE</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              ตัวแทนจำหน่าย DJI อย่างเป็นทางการ ครบครันทั้งโดรน กล้อง Gimbal
              และ Enterprise Solutions สำหรับภาครัฐและเอกชน
            </p>
          </div>

          {/* สินค้า */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">สินค้า</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=113" className="text-muted-foreground hover:text-primary text-sm transition-colors">Camera Drones</Link></li>
              <li><Link href="/products?category=126" className="text-muted-foreground hover:text-primary text-sm transition-colors">Handheld</Link></li>
              <li><Link href="/products?category=224" className="text-muted-foreground hover:text-primary text-sm transition-colors">DJI Enterprise</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary text-sm transition-colors">ดูสินค้าทั้งหมด</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/enterprise" className="text-muted-foreground hover:text-primary text-sm transition-colors">13 STORE Enterprise</Link></li>
              <li><Link href="/platform" className="text-muted-foreground hover:text-primary text-sm transition-colors">UAV AI Platform</Link></li>
              <li><Link href="/altura" className="text-muted-foreground hover:text-primary text-sm transition-colors">Altura VTOL Dock</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-primary text-sm transition-colors">Use Cases</Link></li>
              <li><Link href="/roi-calculator" className="text-muted-foreground hover:text-primary text-sm transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>

          {/* ติดต่อ */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">ติดต่อเรา</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">สาขาลาดปลาเค้า</p>
                  <p>616/6 ถ.ลาดปลาเค้า แขวงจรเข้บัว เขตลาดพร้าว กทม. 10230</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">สาขาราชพฤกษ์</p>
                  <p>14/2 ม.20 ถ.ราชพฤกษ์ แขวงบางระมาด เขตตลิ่งชัน กทม. 10170</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+66894500055" className="hover:text-primary transition-colors">089-450-0055</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href="mailto:mkt.13store@gmail.com" className="hover:text-primary transition-colors">mkt.13store@gmail.com</a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.facebook.com/dji13store" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://line.me/ti/p/~@dji13store" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LINE">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} 13 STORE. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-2xl">
              เปิดให้บริการ จ–อา 09:30–18:30 น. | DJI และโลโก้ DJI เป็นเครื่องหมายการค้าของ SZ DJI Technology Co., Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
