'use client';

import { PresentationLayout } from "@/components/presentation/PresentationLayout";
import { PresentationSlide, SlideTitle, SlideGrid, SlideCard } from "@/components/presentation/PresentationSlide";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle, Eye, Brain, Shield, Anchor, Building, 
  AlertTriangle, Target, Globe, DollarSign, Flag, Calendar, Zap,
  Compass, Cog, MapPin
} from "lucide-react";
import Link from 'next/link';
import { StrategicDiagram } from "@/components/altura/StrategicDiagram";
import { DeploymentDiagram } from "@/components/altura/DeploymentDiagram";
import { ProductShowcase } from "@/components/altura/ProductShowcase";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const executiveNarrative = [
  { icon: Eye, title: "ดวงตา", subtitle: "เฝ้าระวัง", desc: "ดวงตาเฝ้าระวังทุกพื้นที่" },
  { icon: Brain, title: "สมอง", subtitle: "วิเคราะห์", desc: "สมองวิเคราะห์และประมวลผล" },
  { icon: Compass, title: "แขนยาว", subtitle: "เข้าถึง", desc: "แขนยาวเข้าถึงทุกจุด" },
  { icon: Cog, title: "อัตโนมัติ", subtitle: "24/7", desc: "ระบบอัตโนมัติตลอด 24 ชม." },
];

const threatGaps = [
  "ชายแดนยาว + ภูมิประเทศซับซ้อน",
  "ภัยคุกคามรูปแบบใหม่: โดรน, ลักลอบ, ข้ามแดน, IUU, ภัยพิบัติ",
  "คนไม่พอ / งบไม่พอ",
  "ตอบสนองไม่ทัน",
];

const solutionComponents = [
  { title: "VTOL UAV ระยะไกล", desc: "50–150 กม.", icon: MapPin },
  { title: "Dock Station อัตโนมัติ", desc: "Takeoff / Landing / Charging", icon: Building },
  { title: "เซ็นเซอร์บูรณาการ", desc: "EO/IR, Thermal, LiDAR, AIS, Radar", icon: Eye },
  { title: "C2 + GIS + AI Hub", desc: "Private / On-Prem Analytics", icon: Brain },
];

const useCases = [
  {
    id: "border",
    icon: Shield,
    title: "ความมั่นคงชายแดน",
    items: ["ลาดตระเวนแนวชายแดน", "ตรวจจับการลักลอบ/ข้ามแดน", "ทำงานร่วมเรดาร์ภาคพื้น"],
  },
  {
    id: "maritime",
    icon: Anchor,
    title: "ความมั่นคงทางทะเล",
    items: ["คุ้มครองน่านน้ำ/ทรัพยากร", "ปราบ IUU/ลักลอบขนของ", "สนับสนุนกองทัพเรือ/ตำรวจน้ำ"],
  },
  {
    id: "infrastructure",
    icon: Building,
    title: "โครงสร้างพื้นฐานสำคัญ",
    items: ["โรงไฟฟ้า / เขื่อน / ท่อก๊าซ", "สนามบิน / ท่าเรือ", "ตรวจจับการบุกรุกก่อนเกิดเหตุ"],
  },
  {
    id: "disaster",
    icon: AlertTriangle,
    title: "ภัยพิบัติและความปลอดภัยสาธารณะ",
    items: ["น้ำท่วม / ไฟป่า / แผ่นดินไหว", "ค้นหา-กู้ภัยไม่เสี่ยงชีวิต", "สนับสนุนเหตุฉุกเฉิน"],
  },
];

const strategicValues = [
  { icon: Flag, title: "ลดพึ่งพาต่างชาติ 100%", desc: "ไม่พึ่งพาเทคโนโลยีต่างประเทศ" },
  { icon: Shield, title: "Sovereign Capability", desc: "ควบคุมระดับชาติได้เต็มที่" },
  { icon: Zap, title: "ตัดสินใจเร็วขึ้น", desc: "ข้อมูล Real-time Intelligence" },
  { icon: Globe, title: "Regional Security Hub", desc: "ยกระดับไทยเป็นศูนย์กลางภูมิภาค" },
];

const costEffectiveness = [
  { metric: "10–15x", desc: "OPEX ต่ำกว่าเฮลิคอปเตอร์" },
  { metric: "80%", desc: "ลดกำลังพลได้" },
  { metric: "หลายหน่วยงาน", desc: "ใช้โครงสร้างพื้นฐานร่วมกัน" },
];


export default function AlturaPage() {
  const sections = [
    // Slide 1: Hero
    {
      id: "hero",
      content: (
        <PresentationSlide variant="hero">
          <SlideTitle
            badge="แผนการนำเสนอเชิงยุทธศาสตร์ระดับชาติ"
            title="Altura VTOL Dock"
            subtitle="โครงสร้างพื้นฐานความมั่นคงทางอากาศอัตโนมัติระดับชาติ"
            description="สำหรับกองทัพ / ตำรวจ / กระทรวง / สำนักงบประมาณ / สมช."
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-foreground font-medium mt-4"
          >
            ปกป้องอธิปไตย ชีวิต และทรัพยากรของประเทศไทย
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link href="/contact">
              <button className="btn-navy">
                <Calendar size={20} />
                นัดรับฟังบรรยายสรุป
              </button>
            </Link>
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 2: Executive Narrative
    {
      id: "narrative",
      content: (
        <PresentationSlide>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              ภาพรวมแนวคิด (Executive Narrative)
            </h2>
            <p className="text-muted-foreground">
              Altura VTOL Dock ทำหน้าที่เป็นโครงสร้างพื้นฐานความมั่นคงทางอากาศของไทย
            </p>
          </div>
          <SlideGrid cols={4}>
            {executiveNarrative.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-xl">{item.title}</h3>
                <p className="text-sm text-primary font-medium">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 3: Strategic Diagram
    {
      id: "diagram",
      content: (
        <PresentationSlide centered={false}>
          <StrategicDiagram />
        </PresentationSlide>
      )
    },

    // Slide 4: Product Showcase (NEW)
    {
      id: "products",
      content: (
        <PresentationSlide centered={false}>
          <ProductShowcase />
        </PresentationSlide>
      )
    },

    // Slide 4: Threat & Opportunity
    {
      id: "threat",
      content: (
        <PresentationSlide>
          <div className="grid lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                เฟส 1: โจทย์ → ช่องว่าง → โอกาส
              </span>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                บริบทความมั่นคงของไทยวันนี้
              </h2>
              <div className="space-y-3 mb-6">
                {threatGaps.map((gap, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border"
                  >
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">{gap}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <p className="text-destructive font-semibold">🔴 ปัญหาหลัก:</p>
                <p className="text-foreground text-sm">&quot;มนุษย์เฝ้าไม่ได้ 24/7 แต่ภัยมาได้ตลอดเวลา&quot;</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl card-navy"
            >
              <h3 className="text-xl font-bold mb-4">โอกาส (Opportunity)</h3>
              <p className="text-white/80 mb-6 text-sm">
                ระบบอัตโนมัติสำหรับการตรวจตราต่อเนื่อง — ความมั่นคงทางอากาศ 24/7 โดยไม่เสี่ยงกำลังพล
              </p>
              <ul className="space-y-3">
                {["ไม่มีจุดบอด", "ลดเวลาตอบสนองเหลือนาที", "ขยายพื้นที่ครอบคลุมทั่วประเทศ"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </PresentationSlide>
      )
    },

    // Slide 5: Solution Architecture
    {
      id: "solution",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              เฟส 2: สถาปัตยกรรมโซลูชัน
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              โครงสร้างพื้นฐานความมั่นคงทางอากาศอัตโนมัติ
            </h2>
          </div>
          <SlideGrid cols={4}>
            {solutionComponents.map((item, i) => (
              <SlideCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                index={i}
              />
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 6: Use Cases
    {
      id: "use-cases",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              เฟส 3: Use Cases ความมั่นคง
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              การประยุกต์ใช้ด้านความมั่นคงแห่งชาติ
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{useCase.title}</h3>
                </div>
                <ul className="space-y-2">
                  {useCase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </PresentationSlide>
      )
    },

    // Slide 7: Deployment Map
    {
      id: "deployment",
      content: (
        <PresentationSlide centered={false}>
          <DeploymentDiagram />
        </PresentationSlide>
      )
    },

    // Slide 8: Strategic Value
    {
      id: "value",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              คุณค่าเชิงยุทธศาสตร์
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              ทำไมต้องลงทุน?
            </h2>
          </div>
          <SlideGrid cols={4}>
            {strategicValues.map((item, i) => (
              <SlideCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                index={i}
              />
            ))}
          </SlideGrid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {costEffectiveness.map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-card border border-border">
                <p className="text-2xl font-bold text-primary">{item.metric}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 9: CTA
    {
      id: "cta",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              พร้อมยกระดับ
              <br />
              <span className="text-primary">ความมั่นคงของประเทศไทย?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8"
            >
              นัดรับฟังบรรยายสรุปเชิงยุทธศาสตร์กับทีมผู้เชี่ยวชาญของเรา
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact">
                <button className="btn-navy">
                  <Calendar size={20} />
                  นัดรับฟังบรรยายสรุป
                </button>
              </Link>
              <Link href="/platform">
                <button className="btn-hero-secondary">
                  ดู Platform
                  <ArrowRight size={20} />
                </button>
              </Link>
            </motion.div>
          </div>
        </PresentationSlide>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated VTOL Drones */}
      <FlyingDrone
        className="w-14 h-14"
        pathX={[50, 300, 550, 400, 150, 50]}
        pathY={[200, 280, 180, 320, 240, 200]}
        rotation={[0, 12, -10, 15, -6, 0]}
        duration={24}
        color="text-primary/20"
      />
      <FlyingDrone
        className="w-12 h-12"
        pathX={[520, 300, 80, 220, 480, 520]}
        pathY={[450, 360, 420, 500, 380, 450]}
        rotation={[0, -12, 10, -12, 8, 0]}
        duration={20}
        delay={8}
        color="text-emerald-500/20"
      />
      <FlyingDrone
        className="w-10 h-10"
        pathX={[280, 450, 600, 400, 200, 280]}
        pathY={[100, 160, 80, 180, 120, 100]}
        rotation={[0, 8, -8, 10, -5, 0]}
        duration={18}
        delay={4}
        color="text-blue-500/20"
      />
      <main className="pt-16">
        <PresentationLayout sections={sections} />
      </main>
    </div>
  );
}
