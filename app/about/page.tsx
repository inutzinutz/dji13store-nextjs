import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, Users, Headphones, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'DJI13Store ตัวแทนจำหน่าย DJI อย่างเป็นทางการ สินค้าแท้ บริการดี มีประกัน',
};

const stats = [
  { num: '5+',   label: 'ปีที่เปิดให้บริการ' },
  { num: '500+', label: 'ลูกค้าที่ไว้วางใจ' },
  { num: '100+', label: 'รุ่นสินค้า DJI' },
  { num: '100%', label: 'สินค้าของแท้' },
];

const values = [
  { icon: Shield,     title: 'สินค้าของแท้',     desc: 'Authorized DJI Dealer มีใบรับรองจาก DJI โดยตรง' },
  { icon: Award,      title: 'คุณภาพมาตรฐาน',    desc: 'ผ่านการตรวจสอบคุณภาพทุกชิ้นก่อนส่งมอบลูกค้า' },
  { icon: Users,      title: 'ลูกค้าไว้วางใจ',   desc: 'รีวิวจากลูกค้าจริงหลายร้อยราย ทั้ง online และ walk-in' },
  { icon: Headphones, title: 'บริการหลังขาย',    desc: 'ดูแลลูกค้าหลังการขายอย่างต่อเนื่อง ปรึกษาได้ทุกวัน' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[hsl(222,47%,15%)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
          <div className="section-label justify-center mb-5">
            <span className="w-4 h-px bg-primary inline-block" />
            เกี่ยวกับเรา
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            DJI<span className="text-primary">13</span>Store
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            ตัวแทนจำหน่าย DJI อย่างเป็นทางการ ด้วยประสบการณ์กว่า 5 ปี
            พร้อมให้คำปรึกษาและบริการที่ดีที่สุด
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-black text-primary mb-1">{num}</div>
              <div className="text-muted-foreground text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4">
              <span className="w-4 h-px bg-primary inline-block" />
              ทำไมต้องเลือกเรา
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-5 leading-tight">
              ผู้เชี่ยวชาญสินค้า DJI<br />ในประเทศไทย
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              เราเป็นตัวแทนจำหน่าย DJI อย่างเป็นทางการในประเทศไทย
              ให้บริการมาอย่างยาวนานด้วยทีมงานที่มีความเชี่ยวชาญด้านสินค้า DJI โดยเฉพาะ
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ไม่ว่าจะเป็นมือใหม่หรือมืออาชีพ เรามีสินค้าและคำแนะนำที่เหมาะสมสำหรับทุกความต้องการ
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-muted p-5 rounded-2xl border border-border hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 bg-card rounded-xl shadow-sm border border-border flex items-center justify-center mb-3">
                  <Icon size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-black text-foreground mb-3">พร้อมให้บริการคุณแล้ว</h2>
          <p className="text-muted-foreground mb-8">ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและโปรโมชั่นพิเศษ</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[hsl(222,47%,15%)] hover:bg-[hsl(220,35%,25%)] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
            >
              ดูสินค้าทั้งหมด <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/50 text-foreground font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
