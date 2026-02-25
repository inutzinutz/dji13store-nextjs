'use client';

import { PresentationLayout } from "@/components/presentation/PresentationLayout";
import { PresentationSlide, SlideTitle, SlideGrid } from "@/components/presentation/PresentationSlide";
import { motion } from "framer-motion";
import Link from 'next/link';
import { 
  Factory, Building2, Shield, AlertTriangle, ArrowRight, Calendar,
  CheckCircle, TrendingUp, Clock, Users, DollarSign, Award,
  Quote, Star, MapPin, Zap
} from "lucide-react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const caseStudies = [
  {
    id: "industrial-estate",
    category: "Industrial Monitoring",
    icon: Factory,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    client: "นิคมอุตสาหกรรมแห่งหนึ่งในภาคตะวันออก",
    title: "ระบบตรวจสอบโครงสร้างพื้นฐานอัตโนมัติ 24/7",
    challenge: "พื้นที่กว้าง 3,000 ไร่ ต้องตรวจสอบโครงสร้าง ท่อส่ง และระบบไฟฟ้าอย่างสม่ำเสมอ ใช้คนจำนวนมากและมีความเสี่ยงสูง",
    solution: "ติดตั้ง Altura VTOL Dock 2 สถานี + UAV AI Platform สำหรับวิเคราะห์ภาพ AI อัตโนมัติ",
    results: [
      { metric: "80%", label: "ลดเวลาตรวจสอบ" },
      { metric: "50%", label: "ลดค่าใช้จ่าย" },
      { metric: "24/7", label: "เฝ้าระวังต่อเนื่อง" },
      { metric: "0", label: "อุบัติเหตุจากการตรวจสอบ" },
    ],
    testimonial: {
      quote: "ก่อนหน้านี้ใช้คน 10 คน ตรวจสอบสัปดาห์ละครั้ง ตอนนี้ระบบทำได้ทุกวัน แม่นยำกว่า และปลอดภัยกว่ามาก",
      author: "ผู้จัดการฝ่ายวิศวกรรม",
      company: "นิคมอุตสาหกรรมภาคตะวันออก"
    },
    duration: "6 เดือน",
    year: "2568"
  },
  {
    id: "power-plant",
    category: "Infrastructure Inspection",
    icon: Zap,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    client: "โรงไฟฟ้าพลังงานหมุนเวียน",
    title: "ตรวจสอบแผงโซลาร์และสายส่งไฟฟ้าด้วย Thermal + AI",
    challenge: "แผงโซลาร์กว่า 50,000 แผง พื้นที่ 500 ไร่ ต้องตรวจสอบหา Hot Spot และความเสียหายอย่างสม่ำเสมอ",
    solution: "VTOL + Thermal Camera + AI Hot Spot Detection บิน Pattern อัตโนมัติ พร้อม Report สรุปรายสัปดาห์",
    results: [
      { metric: "95%", label: "ความแม่นยำตรวจจับ" },
      { metric: "3x", label: "เร็วกว่าคนตรวจ" },
      { metric: "15%", label: "เพิ่มประสิทธิภาพผลิตไฟฟ้า" },
      { metric: "ROI 6 เดือน", label: "คืนทุน" },
    ],
    testimonial: {
      quote: "เราพบ Hot Spot ที่ซ่อนอยู่กว่า 200 จุด ซึ่งถ้าปล่อยไว้จะเสียหายหนัก ระบบนี้ช่วยประหยัดค่าซ่อมได้มหาศาล",
      author: "วิศวกรอาวุโส",
      company: "บริษัท พลังงานสะอาด จำกัด"
    },
    duration: "3 เดือน",
    year: "2568"
  },
  {
    id: "border-security",
    category: "Security & Surveillance",
    icon: Shield,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10",
    client: "หน่วยงานความมั่นคงชายแดน",
    title: "ระบบเฝ้าระวังชายแดนอัตโนมัติ 150 กม.",
    challenge: "แนวชายแดนยาว 150 กม. ภูมิประเทศซับซ้อน กำลังพลไม่เพียงพอ มีการลักลอบข้ามแดนบ่อยครั้ง",
    solution: "Grid Deployment 5 สถานี Altura VTOL Dock ครอบคลุมทั้งแนว เชื่อมต่อ C2 Center ส่วนกลาง",
    results: [
      { metric: "150 กม.", label: "ระยะครอบคลุม" },
      { metric: "70%", label: "ลดการลักลอบ" },
      { metric: "5 นาที", label: "เวลาตอบสนอง" },
      { metric: "60%", label: "ลดกำลังพล" },
    ],
    testimonial: {
      quote: "ระบบนี้เหมือนมีดวงตาเฝ้าระวังตลอด 24 ชั่วโมง เราตรวจจับการเคลื่อนไหวได้ทันทีและส่งกำลังไปถึงเร็วมาก",
      author: "ผู้บังคับหน่วย",
      company: "หน่วยงานความมั่นคงชายแดน"
    },
    duration: "12 เดือน",
    year: "2567"
  },
  {
    id: "disaster-response",
    category: "Disaster & Emergency",
    icon: AlertTriangle,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10",
    client: "กรมป้องกันและบรรเทาสาธารณภัย (ปภ.)",
    title: "ระบบตอบสนองภัยพิบัติด้วยโดรนพร้อมใช้งาน",
    challenge: "เหตุภัยพิบัติเกิดขึ้นบ่อย ต้องการข้อมูลสถานการณ์แบบ Real-time เพื่อวางแผนกู้ภัย",
    solution: "Rapid Deployment Kit พร้อม Dock เคลื่อนที่ + UAV AI Platform สำหรับ Situational Awareness",
    results: [
      { metric: "15 นาที", label: "พร้อมบิน" },
      { metric: "Real-time", label: "ภาพสด" },
      { metric: "3x", label: "เร็วกว่าเดิม" },
      { metric: "100+", label: "ภารกิจสำเร็จ" },
    ],
    testimonial: {
      quote: "ตอนน้ำท่วมใหญ่ปีที่แล้ว ระบบนี้ช่วยให้เราเห็นสถานการณ์ได้ทันที วางแผนอพยพได้เร็วขึ้น ช่วยชีวิตคนได้มากขึ้น",
      author: "ผู้อำนวยการศูนย์บรรเทาสาธารณภัย",
      company: "กรมป้องกันและบรรเทาสาธารณภัย"
    },
    duration: "Ongoing",
    year: "2567-ปัจจุบัน"
  },
];

const overallStats = [
  { icon: Building2, metric: "20+", label: "โครงการสำเร็จ" },
  { icon: Users, metric: "15+", label: "ลูกค้าองค์กร" },
  { icon: TrendingUp, metric: "95%", label: "ความพึงพอใจ" },
  { icon: Award, metric: "100%", label: "ส่งมอบตามกำหนด" },
];

export default function CaseStudiesPage() {
  const sections = [
    // Slide 1: Hero
    {
      id: "hero",
      content: (
        <PresentationSlide variant="hero">
          <SlideTitle
            badge="Case Studies"
            title="เรื่องราวความสำเร็จ"
            subtitle="โครงการจริง ผลลัพธ์จริง จากลูกค้าของเรา"
            description="ดูตัวอย่างโครงการที่ 13 STORE ส่งมอบให้ลูกค้าองค์กรและหน่วยงานภาครัฐ"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {overallStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <stat.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.p 
                  className="text-3xl font-bold text-primary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.metric}
                </motion.p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slides 2-5: Individual Case Studies
    ...caseStudies.map((cs, index) => ({
      id: cs.id,
      content: (
        <PresentationSlide centered={false}>
          <div className="py-8">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cs.color} flex items-center justify-center`}>
                <cs.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full ${cs.bgColor} text-xs font-medium text-foreground mb-1`}>
                  {cs.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{cs.title}</h2>
              </div>
            </motion.div>

            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-6 text-sm text-muted-foreground"
            >
              <MapPin className="w-4 h-4" />
              <span>{cs.client}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4" />
              <span>{cs.duration}</span>
              <span className="mx-2">•</span>
              <span>{cs.year}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Challenge & Solution */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-5 rounded-xl bg-destructive/5 border border-destructive/20"
                >
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-xs text-destructive">!</span>
                    ความท้าทาย
                  </h3>
                  <p className="text-sm text-muted-foreground">{cs.challenge}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    โซลูชัน
                  </h3>
                  <p className="text-sm text-muted-foreground">{cs.solution}</p>
                </motion.div>
              </div>

              {/* Right: Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  ผลลัพธ์
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cs.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-xl bg-card border border-border text-center"
                    >
                      <motion.p 
                        className="text-2xl font-bold text-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        {result.metric}
                      </motion.p>
                      <p className="text-xs text-muted-foreground">{result.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 p-6 rounded-2xl card-navy"
            >
              <Quote className="w-8 h-8 text-primary mb-3" />
              <p className="text-white text-lg italic mb-4">"{cs.testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-white">{cs.testimonial.author}</p>
                  <p className="text-sm text-white/70">{cs.testimonial.company}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </PresentationSlide>
      )
    })),

    // Slide 6: Summary & CTA
    {
      id: "cta",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <Award className="w-16 h-16 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                พร้อมสร้างความสำเร็จถัดไป
                <br />
                <span className="text-primary">กับองค์กรของคุณ?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                ทุกโครงการเริ่มต้นจากการพูดคุย — บอกเราว่าคุณต้องการอะไร
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact">
                <button className="btn-navy">
                  <Calendar size={20} />
                  นัดพูดคุยโครงการ
                </button>
              </Link>
              <Link href="/roi-calculator">
                <button className="btn-hero-secondary">
                  <DollarSign size={20} />
                  คำนวณ ROI
                </button>
              </Link>
              <Link href="/solutions">
                <button className="btn-hero-secondary">
                  ดู Solutions
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
      {/* Animated Drones representing successful missions */}
      <FlyingDrone
        className="w-11 h-11"
        pathX={[80, 280, 480, 320, 120, 80]}
        pathY={[180, 220, 150, 250, 200, 180]}
        rotation={[0, 10, -8, 12, -5, 0]}
        duration={20}
        color="text-primary/20"
      />
      <FlyingDrone
        className="w-9 h-9"
        pathX={[450, 250, 80, 200, 400, 450]}
        pathY={[350, 280, 320, 400, 300, 350]}
        rotation={[0, -8, 10, -10, 6, 0]}
        duration={17}
        delay={6}
        color="text-violet-500/20"
      />
      <main className="pt-16">
        <PresentationLayout sections={sections} />
      </main>
    </div>
  );
}
