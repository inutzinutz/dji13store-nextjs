'use client';

import { PresentationLayout } from "@/components/presentation/PresentationLayout";
import { PresentationSlide, SlideTitle, SlideGrid, SlideCard } from "@/components/presentation/PresentationSlide";
import { motion } from "framer-motion";
import Link from 'next/link';
import { 
  Building2, 
  Siren, 
  HardHat, 
  TrafficCone, 
  Landmark,
  MapPin,
  Anchor,
  Mountain,
  ArrowRight,
  Shield,
  CheckCircle,
  Calendar
} from "lucide-react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const solutionGroups = [
  {
    id: "security",
    title: "ความมั่นคง",
    subtitle: "Security & Defense",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-500/10",
    solutions: [
      { icon: Siren, title: "Emergency Response", subtitle: "ดับเพลิง / กู้ภัย", description: "ค้นหาผู้ประสบภัย วางแผนเส้นทาง ประสานงานหน่วย", capabilities: ["Thermal", "Real-time Video", "Night Ops"] },
      { icon: MapPin, title: "Border Security", subtitle: "ชายแดน / ความมั่นคง", description: "เฝ้าระวังชายแดน ตรวจจับการลักลอบ", capabilities: ["Long Endurance", "Day/Night", "Autonomous"] },
      { icon: Shield, title: "Critical Infrastructure", subtitle: "โครงสร้างสำคัญ", description: "ปกป้องสถานที่สำคัญ เขื่อน โรงไฟฟ้า", capabilities: ["24/7 Monitor", "AI Alert", "Perimeter"] },
    ]
  },
  {
    id: "urban",
    title: "เมืองอัจฉริยะ",
    subtitle: "Smart City & Traffic",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    solutions: [
      { icon: Building2, title: "Smart City", subtitle: "เฝ้าระวังเมือง", description: "ระบบ 24/7 สำหรับเมืองอัจฉริยะ", capabilities: ["24/7 Monitoring", "AI Analytics", "Crowd Detection"] },
      { icon: TrafficCone, title: "Highway Police", subtitle: "ตรวจจราจร / อุบัติเหตุ", description: "ตรวจสอบสภาพจราจร ประเมินอุบัติเหตุ", capabilities: ["Quick Deploy", "Wide Coverage", "Incident Report"] },
      { icon: Landmark, title: "Local Government", subtitle: "ท้องถิ่น / สำรวจ", description: "สำรวจที่ดิน ทำแผนที่ เตรียมพร้อมรับภัยพิบัติ", capabilities: ["Land Survey", "Asset Inspection", "Disaster Prep"] },
    ]
  },
  {
    id: "industry",
    title: "อุตสาหกรรม",
    subtitle: "Industrial & Infrastructure",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    solutions: [
      { icon: HardHat, title: "Construction", subtitle: "ก่อสร้าง / Survey", description: "สำรวจพื้นที่ ติดตามความคืบหน้า 3D Mapping", capabilities: ["Aerial Survey", "3D Mapping", "Progress Report"] },
      { icon: Mountain, title: "Infrastructure", subtitle: "ไฟฟ้า / น้ำ / โทรคมนาคม", description: "ตรวจสอบสายส่งไฟฟ้า ท่อส่ง เสาโทรคมนาคม", capabilities: ["Power Line", "Pipeline", "Predictive MA"] },
      { icon: Anchor, title: "Maritime", subtitle: "ทะเล / ท่าเรือ", description: "ลาดตระเวนทางทะเล ตรวจสอบท่าเรือ", capabilities: ["Offshore Ops", "Ship Tracking", "SAR Support"] },
    ]
  }
];

const benefitStats = [
  { label: "เพิ่มพื้นที่ครอบคลุม", value: "5-20x", color: "text-primary" },
  { label: "ลดเวลาตอบสนอง", value: "30-70%", color: "text-emerald-500" },
  { label: "หลักฐานภาพ/วิดีโอ", value: "100%", color: "text-blue-500" },
  { label: "ประหยัดกำลังคน", value: "50%+", color: "text-violet-500" },
];

export default function SolutionsPage() {
  const sections = [
    // Slide 1: Hero
    {
      id: "hero",
      content: (
        <PresentationSlide variant="hero">
          <SlideTitle
            badge="Solutions Library"
            title="โซลูชันตามกลุ่มเป้าหมาย"
            subtitle="One Platform — Multi Use Cases"
            description="เลือกดูโซลูชันที่เหมาะกับภารกิจของคุณ — ปรับแต่งได้ตามความต้องการจริง"
          />
        </PresentationSlide>
      )
    },

    // Slide 2: Security Solutions
    {
      id: "security",
      content: (
        <PresentationSlide>
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r ${solutionGroups[0].color}`}
            >
              <span className="text-lg font-bold text-white">{solutionGroups[0].title}</span>
              <span className="text-sm text-white/80">— {solutionGroups[0].subtitle}</span>
            </motion.div>
          </div>
          <SlideGrid cols={3}>
            {solutionGroups[0].solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solutionGroups[0].color} flex items-center justify-center`}>
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{solution.title}</h3>
                    <p className="text-sm text-primary">{solution.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.capabilities.map((cap) => (
                    <span key={cap} className={`px-3 py-1 rounded-full ${solutionGroups[0].bgColor} text-xs font-medium text-foreground`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 3: Urban Solutions
    {
      id: "urban",
      content: (
        <PresentationSlide>
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r ${solutionGroups[1].color}`}
            >
              <span className="text-lg font-bold text-white">{solutionGroups[1].title}</span>
              <span className="text-sm text-white/80">— {solutionGroups[1].subtitle}</span>
            </motion.div>
          </div>
          <SlideGrid cols={3}>
            {solutionGroups[1].solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solutionGroups[1].color} flex items-center justify-center`}>
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{solution.title}</h3>
                    <p className="text-sm text-primary">{solution.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.capabilities.map((cap) => (
                    <span key={cap} className={`px-3 py-1 rounded-full ${solutionGroups[1].bgColor} text-xs font-medium text-foreground`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 4: Industry Solutions
    {
      id: "industry",
      content: (
        <PresentationSlide>
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r ${solutionGroups[2].color}`}
            >
              <span className="text-lg font-bold text-white">{solutionGroups[2].title}</span>
              <span className="text-sm text-white/80">— {solutionGroups[2].subtitle}</span>
            </motion.div>
          </div>
          <SlideGrid cols={3}>
            {solutionGroups[2].solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solutionGroups[2].color} flex items-center justify-center`}>
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{solution.title}</h3>
                    <p className="text-sm text-primary">{solution.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.capabilities.map((cap) => (
                    <span key={cap} className={`px-3 py-1 rounded-full ${solutionGroups[2].bgColor} text-xs font-medium text-foreground`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 5: Benefits Summary
    {
      id: "benefits",
      content: (
        <PresentationSlide>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ทุกโซลูชันได้อะไร?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefitStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-card border border-border text-center"
              >
                <motion.p 
                  className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </PresentationSlide>
      )
    },

    // Slide 6: CTA
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
              ไม่เห็น Use Case ของคุณ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              เราออกแบบโซลูชันเฉพาะทางได้ — นัดคุยกับทีมผู้เชี่ยวชาญ
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
                  นัดคุยกับทีม
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
      {/* Animated Drones */}
      <FlyingDrone
        className="w-12 h-12"
        pathX={[50, 250, 450, 300, 100, 50]}
        pathY={[150, 200, 120, 220, 180, 150]}
        rotation={[0, 8, -6, 10, -4, 0]}
        duration={18}
        color="text-primary/25"
      />
      <FlyingDrone
        className="w-10 h-10"
        pathX={[400, 200, 50, 180, 350, 400]}
        pathY={[300, 250, 280, 350, 270, 300]}
        rotation={[0, -10, 8, -8, 6, 0]}
        duration={16}
        delay={5}
        color="text-emerald-500/25"
      />
      <main className="pt-16">
        <PresentationLayout sections={sections} />
      </main>
    </div>
  );
}
