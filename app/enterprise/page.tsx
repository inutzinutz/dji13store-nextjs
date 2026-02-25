'use client';

import { motion } from "framer-motion";
import { 
  Users, Cog, Briefcase, HeadphonesIcon, ArrowRight, CheckCircle,
  Building, Target, DollarSign, Calendar, Shield, Factory, Building2,
  Cpu, ChevronRight, MapPin, Layers, Brain, Wrench, GraduationCap,
  FileText, Clock, TrendingUp, Award, MessageSquare, Send, Camera,
  Presentation, Rocket, Database, Globe, Play, Phone, Thermometer,
  Map, Search, Eye
} from "lucide-react";
import { FlyingDrone } from "@/components/icons/DroneIcon";
import { PresentationLayout } from "@/components/presentation/PresentationLayout";
import { PresentationSlide, SlideTitle, SlideGrid, SlideCard } from "@/components/presentation/PresentationSlide";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";

// Image paths (public folder)
const enterpriseTeam1 = "/assets/enterprise-team-1.jpg";
const enterpriseTeam2 = "/assets/enterprise-team-2.jpg";
const enterpriseCase1 = "/assets/enterprise-case-1.jpg";
const enterpriseCase2 = "/assets/enterprise-case-2.jpg";

const matrice4eImg = "/assets/products/matrice-4e.jpg";
const matrice4tImg = "/assets/products/matrice-4t.jpg";
const matrice400Img = "/assets/products/matrice-400.jpg";
const djiDock2Img = "/assets/products/dji-dock-2.jpg";
const djiDock3Img = "/assets/products/dji-dock-3.jpg";
const lmPlatformImg = "/assets/products/lm-platform-command.jpg";
const zenmuseS1Img = "/assets/products/zenmuse-s1.jpg";
const zenmuseV1Img = "/assets/products/zenmuse-v1.jpg";
const zenmuseH30Img = "/assets/products/zenmuse-h30.jpg";
const zenmuseL3Img = "/assets/products/zenmuse-l3.jpg";
const zenmuseH20nImg = "/assets/products/zenmuse-h20n.jpg";
const zenmuseP1Img = "/assets/products/zenmuse-p1.jpg";

// Industries that use DJI Enterprise
const industries = [
  {
    id: "public-safety",
    icon: Shield,
    title: "ความปลอดภัยสาธารณะ",
    desc: "ให้บริการชุมชนของคุณได้ดีขึ้นด้วยข้อมูลทางอากาศที่แม่นยำและทันท่วงที",
    color: "from-red-500 to-red-600"
  },
  {
    id: "geospatial",
    icon: Map,
    title: "ภูมิสารสนเทศ",
    desc: "แปลงสินทรัพย์ของคุณเป็นดิจิทัลและจัดการด้วยโซลูชันโดรน",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "inspection",
    icon: Search,
    title: "การตรวจสอบ",
    desc: "ตรวจสอบและจัดการสินทรัพย์ อุปกรณ์ และโครงสร้างพื้นฐานอย่างปลอดภัย",
    color: "from-amber-500 to-amber-600"
  },
];

// Drone Comparison Table
const droneComparison = [
  {
    name: "Matrice 4E",
    highlight: "กล้องความละเอียดสูง\nเหมาะกับ Mapping",
    weight: "~1.2 กก. (ไม่รวมแบต)",
    camera: "Wide 20MP + Tele 48MP",
    flightTime: "~45 นาที",
    weather: "ทนลม ~12 m/s",
    useCase: "สำรวจพื้นที่ / สร้างแผนที่ 2D–3D",
  },
  {
    name: "Matrice 4T",
    highlight: "กล้อง Thermal + Zoom\nสำหรับงานกลางคืน",
    weight: "~1.2 กก. (ไม่รวมแบต)",
    camera: "Wide 48MP + Thermal 640×512",
    flightTime: "~45 นาที",
    weather: "ทนลม ~12 m/s",
    useCase: "ค้นหา / เฝ้าระวัง / กู้ภัย",
  },
  {
    name: "DJI Dock",
    highlight: "บิน-ชาร์จ-สั่งงานอัตโนมัติ\n24 ชม.",
    weight: "~55 กก. (ตัว Dock)",
    camera: "กล้องรักษาความปลอดภัย + Thermal",
    flightTime: "~50 นาทีต่อรอบ",
    weather: "IP56 (Dock) / IP55 (Drone)",
    useCase: "เฝ้าระวังพื้นที่ต่อเนื่อง โรงงาน",
  },
  {
    name: "Matrice 400",
    highlight: "รองรับ Payload หลากหลาย",
    weight: "~9–10 กก. (รวมแบต/กล้อง)",
    camera: "เลือกติดตั้งได้ (Zoom / Night / LiDAR)",
    flightTime: "สูงสุด ~59 นาที",
    weather: "IP55",
    useCase: "งานอุตสาหกรรม / ภารกิจเฉพาะทาง",
  },
];

// Products - Drones
const droneProducts = [
  { name: "DJI Matrice 4E", tagline: "กล้องความละเอียดสูง เหมาะกับ Mapping", image: matrice4eImg },
  { name: "DJI Matrice 4T", tagline: "กล้อง Thermal + Zoom สำหรับงานกลางคืน", image: matrice4tImg },
  { name: "DJI Matrice 400", tagline: "รองรับ Payload หลากหลาย งานอุตสาหกรรม", image: matrice400Img },
];

// Products - Payloads
const payloadProducts = [
  { name: "Zenmuse S1", desc: "กล้องสำรวจประสิทธิภาพสูง", image: zenmuseS1Img },
  { name: "Zenmuse V1", desc: "กล้องวิดีโอมืออาชีพ", image: zenmuseV1Img },
  { name: "Zenmuse H30 Series", desc: "กล้อง Hybrid Thermal + Zoom", image: zenmuseH30Img },
  { name: "Zenmuse L3", desc: "LiDAR สำหรับ Mapping", image: zenmuseL3Img },
  { name: "Zenmuse H20N", desc: "กล้อง Night Vision", image: zenmuseH20nImg },
  { name: "Zenmuse P1", desc: "กล้อง Photogrammetry", image: zenmuseP1Img },
];

// Products - Dock & Platform
const dockProducts = [
  { name: "UAV AI Platform", desc: "Command & Intelligence Platform", status: "Command Center", image: lmPlatformImg, link: "/platform" },
  { name: "DJI Dock 3", desc: "Autonomous Drone-in-a-Box", status: "Latest", image: djiDock3Img },
];

// YouTube Videos
const youtubeVideos = [
  { 
    id: "eQlePvj0BOg", 
    title: "DJI Dock 2 กับภารกิจลาดตะเวนสำรวจช้างป่า",
    desc: "สวนพฤกษศาสตร์ วังน้ำเย็น จ.สระแก้ว"
  },
  { 
    id: "3buc1DFcFgg", 
    title: "Unboxing DJI Dock 3",
    desc: "โซลูชันโดรนอัจฉริยะรุ่นใหม่จาก DJI Enterprise"
  },
  { 
    id: "aAVrPIe91H0", 
    title: "Unboxing DJI Matrice 4 Series",
    desc: "โดรนอัจฉริยะ AI ล้ำยุค"
  },
];

// Stats
const stats = [
  { value: "45+", label: "EMPLOYEES" },
  { value: "4", label: "CORE TEAMS" },
  { value: "9+", label: "YEARS EXPERIENCE" },
];

// Section B: Definition cards
const definitionCards = [
  { 
    icon: Cog, 
    title: "System Integrator", 
    desc: "ออกแบบระบบให้ครบตั้งแต่โดรน–ข้อมูล–การใช้งานจริง",
    color: "from-blue-500 to-blue-600"
  },
  { 
    icon: Target, 
    title: "Solution Owner", 
    desc: "รับผิดชอบผลลัพธ์และการส่งมอบแบบเป็นระบบ",
    color: "from-emerald-500 to-emerald-600"
  },
  { 
    icon: Users, 
    title: "Operation Partner", 
    desc: "มีทีมปฏิบัติการ/MA ระยะยาว ไม่ทิ้งลูกค้า",
    color: "from-violet-500 to-violet-600"
  },
];

// Section C: Capability Stack
const capabilityStack = [
  { 
    layer: "01", 
    title: "Hardware Foundation", 
    items: ["Drone DJI", "UAV Helicopter", "VTOL", "LiDAR & GNSS"],
    icon: Layers,
    color: "bg-blue-600"
  },
  { 
    layer: "02", 
    title: "Core Software", 
    items: ["DJI Terra", "FlightHub 2", "SuperMap GIS Stack", "Drone Simulator"],
    icon: Cpu,
    color: "bg-blue-500"
  },
  { 
    layer: "03", 
    title: "AI Platform & GIS", 
    items: ["UAV AI Operations Platform", "GIS Solutions Platform", "Real-time Analytics"],
    icon: Brain,
    color: "bg-primary"
  },
  { 
    layer: "04", 
    title: "Service & Support", 
    items: ["Demo/POC/Consulting", "Training Center", "After-sales MA"],
    icon: Wrench,
    color: "bg-amber-500"
  },
];

// Section D: Delivery Process
const deliverySteps = [
  { step: "1", title: "เข้าใจ Pain ลูกค้า", desc: "ไม่ขายของก่อน ฟังก่อน" },
  { step: "2", title: "Site Survey / Workshop", desc: "ลงพื้นที่ ดูของจริง" },
  { step: "3", title: "Solution Design + Budget", desc: "ออกแบบระบบ + งบคร่าวๆ" },
  { step: "4", title: "Pilot / Demo", desc: "ทดสอบจริง ดูผลจริง" },
  { step: "5", title: "Project Proposal", desc: "เสนอโครงการอย่างเป็นทางการ" },
  { step: "6", title: "MA + Long-term", desc: "สัญญาดูแลระยะยาว" },
];

// Section E: Team Structure
const teamStructure = [
  { role: "Enterprise Sales", desc: "คุย C-Level", icon: Users },
  { role: "Solution Engineer", desc: "ออกแบบระบบ", icon: Cog },
  { role: "Project Manager", desc: "บริหารโครงการ", icon: Briefcase },
  { role: "Operation / Pilot", desc: "ปฏิบัติการ", icon: Cpu },
  { role: "Support & MA", desc: "ดูแลหลังขาย", icon: HeadphonesIcon },
];

// Section F: Trust points
const trustPoints = [
  { icon: MapPin, text: "ทำได้จริงในไทย" },
  { icon: Users, text: "ทีมอยู่หน้างาน ไม่ทิ้งลูกค้า" },
  { icon: FileText, text: "รองรับงานรัฐ / TOR" },
  { icon: Layers, text: "ไม่ผูกยี่ห้อเดียว (Anti-Vendor Lock)" },
];

// Section G: Commercial Models
const commercialModels = [
  {
    title: "Project",
    desc: "ซื้อขาดตามโครงการ",
    icon: Building,
    features: ["ออกแบบตาม TOR", "ส่งมอบครบ", "Warranty 1 ปี"],
    color: "border-blue-500/50"
  },
  {
    title: "MA Contract",
    desc: "สัญญาดูแลรายปี",
    icon: Shield,
    features: ["Support ตลอด", "อัพเกรดระบบ", "Training ทีม"],
    color: "border-emerald-500/50"
  },
  {
    title: "DaaS (เช่า)",
    desc: "Drone-as-a-Service",
    icon: Clock,
    features: ["ลด CAPEX", "ใช้ได้ทันที", "มีทีมดูแลครบ"],
    highlight: true,
    color: "border-primary"
  },
];

// Section H: KPIs
const kpis = [
  { metric: "5-10", label: "ลูกค้า Enterprise Active", unit: "ราย" },
  { metric: "1-3", label: "MA Contract ระยะยาว", unit: "ปี" },
  { metric: "3+", label: "Case Study ใช้งานจริง", unit: "เคส" },
];

// Contact info
const contactInfo = {
  lineId: "@dji13enterprise",
  lineUrl: "https://line.me/R/ti/p/@357kaaxa",
  phone: "061-417-6015",
  formUrl: "https://intake.builk.com/public-form/93c35590-da22-45f6-9528-aca8647ead17",
};

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    organization: "",
    province: "",
    missionType: "",
    urgency: "",
    budget: "",
    pain: ""
  });

  const sections = [
    // Slide 1: Hero
    {
      id: "hero",
      content: (
        <PresentationSlide variant="hero">
          <SlideTitle
            badge="DJI 13 Enterprise"
            title="DJI 13 Enterprise"
            subtitle="ภารกิจมืออาชีพ มาพร้อมเทคโนโลยีขั้นสูง"
            description="ความทนทาน และความแม่นยำสูงสุด เหมาะสำหรับการปฏิบัติงานในทุกสภาพแวดล้อม"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <a href={`tel:${contactInfo.phone}`}>
              <button className="btn-navy">
                <Phone size={20} />
                ติดต่อทีมงาน
              </button>
            </a>
            <a href={contactInfo.lineUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-hero-secondary">
                <MessageSquare size={20} />
                Line: {contactInfo.lineId}
              </button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 2: Industries
    {
      id: "industries",
      content: (
        <PresentationSlide>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              อุตสาหกรรมต่างๆ ที่เลือกใช้
            </h2>
          </div>
          <SlideGrid cols={3}>
            {industries.map((industry, i) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-2xl bg-card border border-border text-center"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-6`}>
                  <industry.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{industry.title}</h3>
                <p className="text-muted-foreground">{industry.desc}</p>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 3: Definition
    {
      id: "definition",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Enterprise คืออะไร
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Definition & Positioning</h2>
          </div>
          <SlideGrid cols={3}>
            {definitionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-2xl bg-card border border-border text-center"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6`}>
                  <card.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-lg">{card.desc}</p>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 4: Drone Comparison Table
    {
      id: "drone-comparison",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Drone Comparison
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ตารางเปรียบเทียบโดรน DJI Enterprise
            </h2>
          </div>
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">ข้อมูลสินค้า</th>
                  {droneComparison.map((drone, i) => (
                    <th key={i} className="p-4 text-center">
                      <span className="text-foreground font-bold">{drone.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground font-medium">จุดเด่นหลัก</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground whitespace-pre-line">{drone.highlight}</td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-secondary/30">
                  <td className="p-4 text-muted-foreground font-medium">น้ำหนัก</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground">{drone.weight}</td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground font-medium">ระบบกล้อง</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground">{drone.camera}</td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-secondary/30">
                  <td className="p-4 text-muted-foreground font-medium">เวลาบินสูงสุด</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground">{drone.flightTime}</td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground font-medium">ทนทานสภาพอากาศ</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground">{drone.weather}</td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-secondary/30">
                  <td className="p-4 text-muted-foreground font-medium">งานที่เหมาะสม</td>
                  {droneComparison.map((drone, i) => (
                    <td key={i} className="p-4 text-center text-sm text-foreground">{drone.useCase}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a href={contactInfo.formUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-navy">
                <FileText size={20} />
                สอบถามข้อมูล / ขอใบเสนอราคา
              </button>
            </a>
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 5: Drones Products
    {
      id: "drones",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              DRONES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              เทคโนโลยีโดรนอัจฉริยะเพื่อภารกิจระดับองค์กร
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              สำรวจ ตรวจวัด บันทึก และเฝ้าระวังได้อย่างแม่นยำด้วยโดรนจาก DJI Enterprise ออกแบบเพื่อรองรับการทำงานในทุกสภาพแวดล้อม
            </p>
          </div>
          <SlideGrid cols={3}>
            {droneProducts.map((drone, i) => (
              <motion.div
                key={drone.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border text-center overflow-hidden"
              >
                <div className="w-full h-40 mb-4 overflow-hidden rounded-xl bg-secondary/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={drone.image} 
                    alt={drone.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{drone.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{drone.tagline}</p>
                <a href={contactInfo.formUrl} target="_blank" rel="noopener noreferrer">
                  <button className="text-primary hover:text-primary/80 font-medium text-sm">
                    สอบถามข้อมูล →
                  </button>
                </a>
              </motion.div>
            ))}
          </SlideGrid>
        </PresentationSlide>
      )
    },

    // Slide 6: Payloads
    {
      id: "payloads",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              PAYLOADS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              กล้องและอุปกรณ์เสริมเพื่อภารกิจระดับมืออาชีพ
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              เสริมศักยภาพของโดรน DJI ด้วยกล้องและโมดูลตรวจจับที่ออกแบบเฉพาะทาง รองรับทั้งงานสำรวจ ตรวจวัดความร้อน บันทึกภาพความละเอียดสูง และภารกิจกู้ภัย
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {payloadProducts.map((payload, i) => (
              <motion.div
                key={payload.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-5 rounded-2xl bg-card border border-border text-center overflow-hidden"
              >
                <div className="w-full h-32 mb-3 overflow-hidden rounded-xl bg-secondary/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={payload.image} 
                    alt={payload.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-foreground mb-1">{payload.name}</h3>
                <p className="text-xs text-muted-foreground">{payload.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a href={contactInfo.formUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-navy">
                <FileText size={20} />
                สอบถามข้อมูล Payloads
              </button>
            </a>
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 7: Remote Drone Operation (Dock)
    {
      id: "dock",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              REMOTE DRONE OPERATION SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              โซลูชันศูนย์ควบคุมโดรนอัตโนมัติแบบครบวงจร
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              ยกระดับการปฏิบัติงานด้วยระบบ DJI Dock สำหรับการบินโดรนระยะไกลโดยไม่ต้องมีผู้ควบคุม รองรับการปล่อย บิน เก็บข้อมูล และชาร์จอัตโนมัติ พร้อมการเชื่อมต่อกับ FlightHub 2
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {dockProducts.map((dock, i) => (
              <motion.div
                key={dock.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl bg-card border-2 text-center overflow-hidden ${dock.status === 'Latest' ? 'border-primary ring-2 ring-primary/20' : dock.status === 'Command Center' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-border'}`}
              >
                {dock.status === 'Latest' && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4">
                    รุ่นใหม่ล่าสุด
                  </span>
                )}
                {dock.status === 'Command Center' && (
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold mb-4">
                    ศูนย์บัญชาการ
                  </span>
                )}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-secondary/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={dock.image} 
                    alt={dock.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{dock.name}</h3>
                {dock.desc && (
                  <p className="text-sm text-muted-foreground mb-4">{dock.desc}</p>
                )}
                {dock.link ? (
                  <Link href={dock.link}>
                    <button className="btn-navy">
                      <ArrowRight size={18} />
                      ดูรายละเอียด Platform
                    </button>
                  </Link>
                ) : (
                  <a href={contactInfo.formUrl} target="_blank" rel="noopener noreferrer">
                    <button className="btn-navy">
                      สอบถามข้อมูล
                    </button>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </PresentationSlide>
      )
    },

    // Slide 8: Capability Stack
    {
      id: "capability",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Capability Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              สแต็กความสามารถ 4 ชั้น
            </h2>
            <p className="text-muted-foreground text-lg">
              ทำให้คุณเห็นว่าเราครบ — End to End Enterprise Solutions
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {capabilityStack.map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: 10 }}
                className="flex items-stretch gap-4"
              >
                <div className={`${layer.color} text-white px-6 py-5 rounded-l-2xl flex items-center justify-center min-w-[180px]`}>
                  <layer.icon className="w-7 h-7 mr-3" />
                  <div>
                    <span className="text-xs opacity-70">Layer {layer.layer}</span>
                    <p className="font-bold">{layer.title.split(' ')[0]}</p>
                  </div>
                </div>
                <div className="flex-1 p-5 rounded-r-2xl bg-card border border-border flex items-center">
                  <div>
                    <p className="font-medium text-foreground text-lg mb-2">{layer.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, j) => (
                        <span key={j} className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </PresentationSlide>
      )
    },

    // Slide 9: YouTube Videos
    {
      id: "videos",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              ตัวอย่างผลงาน
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              วิดีโอสาธิตและรีวิวสินค้า
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {youtubeVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl overflow-hidden bg-card border border-border"
              >
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-muted-foreground">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a href="https://www.youtube.com/@DJI13Storethailand" target="_blank" rel="noopener noreferrer">
              <button className="btn-hero-secondary">
                <Play size={20} />
                ดูวิดีโอทั้งหมดบน YouTube
              </button>
            </a>
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 10: Delivery Process
    {
      id: "delivery",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              How We Deliver
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              กระบวนการส่งมอบ 6 ขั้นตอน
            </h2>
            <p className="text-muted-foreground text-lg">
              นี่คือหัวใจของ Enterprise — ไม่ใช่แค่ขายของ
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {deliverySteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative p-5 rounded-2xl bg-card border border-border text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  {i < deliverySteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </PresentationSlide>
      )
    },

    // Slide 11: Team Structure
    {
      id: "team",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Team Structure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ทีม Enterprise ที่ &quot;ต้องมี&quot;
            </h2>
            <p className="text-muted-foreground text-lg">
              ขายแบบ Enterprise ใช้คนหลายบทบาท ไม่ใช่เซลส์คนเดียว
            </p>
          </div>

          {/* Team Photos */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={enterpriseTeam1} alt="ทีม Enterprise หน้างาน" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold">ทีมปฏิบัติการหน้างาน</p>
                <p className="text-white/80 text-sm">พร้อมให้บริการทั่วประเทศ</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={enterpriseTeam2} alt="ทีม Training & Support" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold">ทีม Training & Support</p>
                <p className="text-white/80 text-sm">พร้อมอบรมและดูแลหลังการขาย</p>
              </div>
            </motion.div>
          </div>

          {/* Team Roles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {teamStructure.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-card border border-border text-center"
              >
                <member.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="font-bold text-foreground text-sm">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </PresentationSlide>
      )
    },

    // Slide 12: Commercial Models
    {
      id: "commercial",
      content: (
        <PresentationSlide>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Commercial Models
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              รูปแบบการซื้อ/สัญญา
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {commercialModels.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl bg-card border-2 ${model.color} ${model.highlight ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
              >
                {model.highlight && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4">
                    แนะนำ
                  </span>
                )}
                <model.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{model.title}</h3>
                <p className="text-muted-foreground mb-4">{model.desc}</p>
                <ul className="space-y-2">
                  {model.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* DaaS Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto p-6 rounded-2xl card-navy"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              DaaS = Drone + Platform + คน + รายงาน + SLA
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-primary font-medium mb-2">ส่วนประกอบราคาเช่า</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>&#x2022; ค่าอุปกรณ์ (Drone + Payload)</li>
                  <li>&#x2022; ค่าแพลตฟอร์ม (License/Cloud/On-Prem)</li>
                  <li>&#x2022; ค่าทีมปฏิบัติการ</li>
                  <li>&#x2022; ค่า MA/Support</li>
                  <li>&#x2022; SLA/Risk Premium</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-primary font-medium mb-2">Upsell Path</p>
                <div className="flex flex-wrap gap-2 text-sm text-white/80">
                  <span className="px-3 py-1 rounded-full bg-white/10">เช่า</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="px-3 py-1 rounded-full bg-white/10">ต่อ MA</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="px-3 py-1 rounded-full bg-white/10">ซื้อบางส่วน</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="px-3 py-1 rounded-full bg-primary/30">+ AI Module</span>
                </div>
              </div>
            </div>
          </motion.div>
        </PresentationSlide>
      )
    },

    // Slide 13: Case Studies
    {
      id: "case-study",
      content: (
        <PresentationSlide variant="accent">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Case Studies & KPIs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ผลงานจริง ใช้งานจริง
            </h2>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-2xl bg-card border border-border text-center"
              >
                <p className="text-3xl font-bold text-primary mb-1">&ge; {kpi.metric}</p>
                <p className="text-foreground font-medium text-sm">{kpi.label}</p>
                <p className="text-xs text-primary">{kpi.unit}</p>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl overflow-hidden bg-card border border-border"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={enterpriseCase1} alt="Case Study - ภาครัฐ" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">ภาครัฐ</span>
                  <h3 className="text-lg font-bold text-white mt-1">โครงการเฝ้าระวังพื้นที่ชายแดน</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xl font-bold text-primary">95%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">24/7</p>
                    <p className="text-xs text-muted-foreground">Operation</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">-50%</p>
                    <p className="text-xs text-muted-foreground">OPEX</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl overflow-hidden bg-card border border-border"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={enterpriseCase2} alt="Case Study - นิคมอุตสาหกรรม" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">อุตสาหกรรม</span>
                  <h3 className="text-lg font-bold text-white mt-1">โครงการ Inspection โรงไฟฟ้า</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xl font-bold text-primary">80%</p>
                    <p className="text-xs text-muted-foreground">เวลาลดลง</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">0</p>
                    <p className="text-xs text-muted-foreground">อุบัติเหตุ</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">DaaS</p>
                    <p className="text-xs text-muted-foreground">Model</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </PresentationSlide>
      )
    },

    // Slide 14: Contact
    {
      id: "contact",
      content: (
        <PresentationSlide>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              พร้อมที่จะเปลี่ยนแปลงธุรกิจของคุณหรือยัง?
            </h2>
            <p className="text-lg text-muted-foreground">
              ติดต่อทีมขายของเราเพื่อหารือว่าโดรนอุตสาหกรรมจะสามารถช่วยให้การดำเนินงานของคุณได้รับประโยชน์ได้อย่างไร
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {/* Line */}
            <motion.a
              href={contactInfo.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border text-center block"
            >
              <MessageSquare className="w-12 h-12 mx-auto text-[#00B900] mb-4" />
              <h3 className="font-bold text-foreground mb-1">ติดต่อทีมงาน</h3>
              <p className="text-primary font-medium">Line ID: {contactInfo.lineId}</p>
              <p className="text-sm text-muted-foreground mt-2">สำหรับพูดคุย สอบถามโซลูชัน หรือนัด Demo</p>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${contactInfo.phone}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border text-center block"
            >
              <Phone className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-1">สายด่วนฝ่ายขาย</h3>
              <p className="text-primary font-medium text-xl">{contactInfo.phone}</p>
              <p className="text-sm text-muted-foreground mt-2">ให้คำปรึกษาโดยผู้เชี่ยวชาญด้านอุตสาหกรรม</p>
            </motion.a>

            {/* Form */}
            <motion.a
              href={contactInfo.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border text-center block"
            >
              <FileText className="w-12 h-12 mx-auto text-amber-500 mb-4" />
              <h3 className="font-bold text-foreground mb-1">ฟอร์มติดต่อ / ขอใบเสนอราคา</h3>
              <p className="text-primary font-medium">กรอกแบบฟอร์ม</p>
              <p className="text-sm text-muted-foreground mt-2">สำหรับองค์กรที่ต้องการข้อมูลเพิ่มเติมหรือขอใบเสนอราคาอย่างเป็นทางการ</p>
            </motion.a>
          </div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">ติดตามเราบนโซเชียลมีเดีย</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/enterprise13store"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#1877F2] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@DJI13Storethailand"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#FF0000] text-white font-medium hover:opacity-90 transition-opacity"
              >
                YouTube
              </a>
            </div>
          </motion.div>
        </PresentationSlide>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Enterprise Drones */}
      <FlyingDrone
        className="w-12 h-12"
        pathX={[60, 280, 500, 380, 140, 60]}
        pathY={[180, 240, 160, 280, 200, 180]}
        rotation={[0, 10, -8, 12, -5, 0]}
        duration={22}
        color="text-primary/20"
      />
      <FlyingDrone
        className="w-10 h-10"
        pathX={[480, 280, 80, 200, 420, 480]}
        pathY={[400, 320, 380, 450, 350, 400]}
        rotation={[0, -10, 8, -10, 6, 0]}
        duration={18}
        delay={7}
        color="text-blue-500/20"
      />
      <main>
        <PresentationLayout sections={sections} />
      </main>
    </div>
  );
}
