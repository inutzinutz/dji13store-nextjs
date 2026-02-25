'use client';

import { motion } from "framer-motion";
import { 
  Eye, Brain, Compass, Cog, Radar, Building, Shield, Anchor, 
  AlertTriangle, Network, Flag, Zap, Globe, DollarSign, Wrench,
  ArrowRight, CheckCircle, Radio, Cpu, MapPin, Users
} from "lucide-react";
import { useState } from "react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const coreComponents = [
  { 
    id: "vtol",
    icon: Radar, 
    title: "VTOL UAV ระยะไกล", 
    subtitle: "50–150 กม.",
    desc: "โดรนปีกตรึงบินขึ้นลงแนวดิ่ง ระยะปฏิบัติการไกล",
    color: "from-blue-500 to-blue-600"
  },
  { 
    id: "dock",
    icon: Building, 
    title: "Dock Station อัตโนมัติ", 
    subtitle: "Takeoff / Landing / Charging",
    desc: "สถานีชาร์จและปล่อยโดรนอัตโนมัติ 24/7",
    color: "from-emerald-500 to-emerald-600"
  },
  { 
    id: "sensors",
    icon: Eye, 
    title: "เซ็นเซอร์บูรณาการ", 
    subtitle: "EO/IR, Thermal, LiDAR, AIS, Radar",
    desc: "ระบบตรวจจับหลากหลายรูปแบบ",
    color: "from-purple-500 to-purple-600"
  },
  { 
    id: "c2",
    icon: Brain, 
    title: "C2 + GIS + AI Hub", 
    subtitle: "Private / On-Prem",
    desc: "ศูนย์บัญชาการ + ระบบวิเคราะห์อัจฉริยะ",
    color: "from-amber-500 to-amber-600"
  },
];

const executiveNarrative = [
  { icon: Eye, title: "ดวงตา", subtitle: "เฝ้าระวัง", color: "bg-blue-500" },
  { icon: Brain, title: "สมอง", subtitle: "วิเคราะห์", color: "bg-purple-500" },
  { icon: Compass, title: "แขนยาว", subtitle: "เข้าถึง", color: "bg-emerald-500" },
  { icon: Cog, title: "อัตโนมัติ", subtitle: "24/7", color: "bg-amber-500" },
];

const agencyConnections = [
  { id: "army", label: "กองทัพ", icon: Shield },
  { id: "police", label: "ตำรวจ", icon: Users },
  { id: "ddpm", label: "ปภ.", icon: AlertTriangle },
  { id: "resources", label: "ทรัพยากรฯ", icon: Globe },
  { id: "gis", label: "ศูนย์ GIS", icon: MapPin },
];

export function StrategicDiagram() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Animated Flying Drones */}
      <FlyingDrone
        className="w-12 h-12"
        pathX={[0, 150, 300, 200, 50, 0]}
        pathY={[0, 40, 20, 60, 30, 0]}
        rotation={[0, 8, -5, 10, -3, 0]}
        duration={14}
        isAnimating={isAnimating}
        color="text-primary"
      />
      <FlyingDrone
        className="w-10 h-10"
        pathX={[300, 150, 0, 100, 250, 300]}
        pathY={[50, 20, 40, 70, 30, 50]}
        rotation={[0, -6, 8, -10, 5, 0]}
        duration={16}
        delay={3}
        isAnimating={isAnimating}
        color="text-blue-500"
      />
      <FlyingDrone
        className="w-8 h-8"
        pathX={[150, 250, 350, 200, 80, 150]}
        pathY={[100, 60, 80, 120, 90, 100]}
        rotation={[0, 5, -8, 6, -4, 0]}
        duration={12}
        delay={6}
        isAnimating={isAnimating}
        color="text-emerald-500"
      />
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          สถาปัตยกรรมระบบ Altura VTOL Dock
        </h3>
        <p className="text-muted-foreground">
          โครงสร้างพื้นฐานความมั่นคงทางอากาศอัตโนมัติ
        </p>
      </motion.div>

      {/* Executive Narrative Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
      >
        {executiveNarrative.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}
              animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              <item.icon className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
            {i < executiveNarrative.length - 1 && (
              <motion.div
                animate={isAnimating ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                <ArrowRight className="w-5 h-5 text-primary hidden md:block" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Diagram */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Hub */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-48 h-48 md:w-64 md:h-64"
        >
          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={isAnimating ? { scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-primary/40"
            animate={isAnimating ? { scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-primary/50"
            animate={isAnimating ? { scale: [1, 1.1, 1], opacity: [0.7, 0.4, 0.7] } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          
          {/* Center content */}
          <div className="absolute inset-12 md:inset-16 rounded-full bg-gradient-to-br from-primary to-amber-600 flex flex-col items-center justify-center text-center shadow-lg">
            <Cpu className="w-8 h-8 md:w-10 md:h-10 text-white mb-1" />
            <span className="text-white font-bold text-xs md:text-sm">ALTURA</span>
            <span className="text-white/80 text-[10px] md:text-xs">VTOL Dock</span>
          </div>
        </motion.div>

        {/* Core Components - Around the hub */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {coreComponents.map((component, i) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => setActiveComponent(component.id)}
              onMouseLeave={() => setActiveComponent(null)}
              className={`relative p-4 md:p-6 rounded-2xl bg-card border-2 cursor-pointer transition-all duration-300 ${
                activeComponent === component.id 
                  ? "border-primary shadow-lg shadow-primary/20" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Connection line animation */}
              <motion.div
                className="absolute -top-4 left-1/2 w-0.5 h-4 bg-gradient-to-b from-primary to-transparent"
                animate={activeComponent === component.id ? { 
                  scaleY: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center mb-3`}>
                <component.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-foreground text-sm text-center mb-1">
                {component.title}
              </h4>
              <p className="text-xs text-primary text-center mb-2">
                {component.subtitle}
              </p>
              <motion.p 
                initial={{ height: 0, opacity: 0 }}
                animate={activeComponent === component.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="text-xs text-muted-foreground text-center overflow-hidden"
              >
                {component.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Data Flow Arrows */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-2 my-8"
        >
          <span className="text-sm text-muted-foreground">ข้อมูล Real-time</span>
          <motion.div
            className="flex gap-1"
            animate={isAnimating ? { x: [0, 10, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
            <ArrowRight className="w-4 h-4 text-primary" />
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm text-muted-foreground">ศูนย์บัญชาการ</span>
        </motion.div>

        {/* Agency Connections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border"
        >
          <h4 className="text-center font-bold text-foreground mb-6">
            เชื่อมต่อหน่วยงาน
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {agencyConnections.map((agency, i) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <motion.div
                  animate={isAnimating ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <agency.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="text-xs font-medium text-foreground">{agency.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 hidden md:block" style={{ top: "-50px" }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(38 92% 50%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Toggle animation button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isAnimating ? "⏸ หยุด Animation" : "▶ เล่น Animation"}
        </button>
      </div>
    </div>
  );
}
