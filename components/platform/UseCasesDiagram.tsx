'use client';

import { motion } from "framer-motion";
import { 
  Shield, Building2, HardHat, TrafficCone, Siren,
  ArrowRight, CheckCircle
} from "lucide-react";
import { useState } from "react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const useCases = [
  {
    id: "police",
    icon: Shield,
    title: "Smart Police",
    subtitle: "ตำรวจอัจฉริยะ",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    benefits: ["ลาดตระเวนอัตโนมัติ", "ติดตามผู้ต้องสงสัย", "หลักฐานภาพชัด", "ประสานงานหน่วย"],
    metrics: { coverage: "10x", response: "50%", evidence: "100%" }
  },
  {
    id: "city",
    icon: Building2,
    title: "Smart City",
    subtitle: "เมืองอัจฉริยะ",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/50",
    benefits: ["เฝ้าระวัง 24/7", "ตรวจสิ่งก่อสร้าง", "จัดการจราจร", "งานอีเวนต์"],
    metrics: { coverage: "5x", response: "40%", evidence: "100%" }
  },
  {
    id: "highway",
    icon: TrafficCone,
    title: "Highway",
    subtitle: "ทางหลวง",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
    benefits: ["ตรวจอุบัติเหตุ", "สำรวจถนน", "ค้นหารถหาย", "รายงานสภาพจราจร"],
    metrics: { coverage: "8x", response: "60%", evidence: "100%" }
  },
  {
    id: "construction",
    icon: HardHat,
    title: "Construction",
    subtitle: "ก่อสร้าง",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/50",
    benefits: ["สำรวจพื้นที่", "ติดตามความคืบหน้า", "ตรวจความปลอดภัย", "3D Mapping"],
    metrics: { coverage: "3x", response: "30%", evidence: "100%" }
  },
  {
    id: "emergency",
    icon: Siren,
    title: "Emergency",
    subtitle: "ฉุกเฉิน/กู้ภัย",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/50",
    benefits: ["ค้นหาผู้ประสบภัย", "ประเมินพื้นที่", "ภาพ Thermal", "สั่งการทีม"],
    metrics: { coverage: "20x", response: "70%", evidence: "100%" }
  },
];

export function UseCasesDiagram() {
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Animated Drones flying across use cases */}
      <FlyingDrone
        className="w-10 h-10"
        pathX={[0, 300, 600, 450, 150, 0]}
        pathY={[0, 40, 20, 70, 30, 0]}
        rotation={[0, 12, -8, 15, -5, 0]}
        duration={16}
        isAnimating={isAnimating}
        color="text-blue-500"
      />
      <FlyingDrone
        className="w-8 h-8"
        pathX={[0, -200, -400, -300, -100, 0]}
        pathY={[0, 50, 25, 80, 40, 0]}
        rotation={[0, -10, 8, -12, 6, 0]}
        duration={13}
        delay={2}
        isAnimating={isAnimating}
        color="text-amber-500"
      />
      <FlyingDrone
        className="w-7 h-7"
        pathX={[0, 150, 300, 200, 80, 0]}
        pathY={[0, -30, -15, -50, -20, 0]}
        rotation={[0, 6, -10, 8, -4, 0]}
        duration={10}
        delay={5}
        isAnimating={isAnimating}
        color="text-red-500"
      />
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          กลุ่มการใช้งานหลัก
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          ครอบคลุมทุกภารกิจ
        </h3>
        <p className="text-muted-foreground">
          One Platform — Multi Use Cases
        </p>
      </motion.div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8">
        {useCases.map((useCase, i) => (
          <motion.div
            key={useCase.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setActiveCase(useCase.id)}
            onMouseLeave={() => setActiveCase(null)}
            className={`relative p-4 md:p-6 rounded-2xl bg-card border-2 cursor-pointer transition-all duration-300 ${
              activeCase === useCase.id 
                ? `${useCase.borderColor} shadow-xl scale-105` 
                : "border-border hover:border-primary/30"
            }`}
          >
            {/* Icon */}
            <motion.div 
              className={`w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-3`}
              animate={isAnimating && activeCase === useCase.id 
                ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } 
                : {}
              }
              transition={{ duration: 0.5 }}
            >
              <useCase.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </motion.div>

            {/* Title */}
            <h4 className="font-bold text-foreground text-center text-sm md:text-base mb-1">
              {useCase.title}
            </h4>
            <p className="text-xs text-primary text-center mb-3">
              {useCase.subtitle}
            </p>

            {/* Benefits - Show on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={activeCase === useCase.id 
                ? { height: "auto", opacity: 1 } 
                : { height: 0, opacity: 0 }
              }
              className="overflow-hidden"
            >
              <div className="space-y-1 pt-2 border-t border-border">
                {useCase.benefits.map((benefit, j) => (
                  <motion.div
                    key={j}
                    initial={{ x: -10, opacity: 0 }}
                    animate={activeCase === useCase.id 
                      ? { x: 0, opacity: 1 } 
                      : { x: -10, opacity: 0 }
                    }
                    transition={{ delay: j * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pulse indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary"
              animate={isAnimating 
                ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } 
                : {}
              }
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-secondary/50 border border-border"
      >
        {[
          { label: "พื้นที่ครอบคลุม", value: "เพิ่ม 5-20x", color: "text-primary" },
          { label: "เวลาตอบสนอง", value: "ลด 30-70%", color: "text-emerald-500" },
          { label: "หลักฐานภาพ", value: "100%", color: "text-blue-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.p 
              className={`text-2xl md:text-3xl font-bold ${stat.color}`}
              animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Toggle animation button */}
      <div className="flex justify-center mt-6">
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
