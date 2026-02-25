'use client';

import { motion } from "framer-motion";
import { 
  Flame, Building2, Users, Car, AlertTriangle, 
  Eye, Waves, TreePine, Factory, ShieldAlert,
  Camera, Brain, Zap
} from "lucide-react";
import { useState } from "react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const aiCategories = [
  {
    id: "safety",
    title: "ความปลอดภัย",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    functions: [
      { icon: Flame, name: "ตรวจจับควัน/ไฟ", desc: "แจ้งเตือนทันทีเมื่อพบเปลวไฟหรือควัน" },
      { icon: AlertTriangle, name: "พฤติกรรมผิดปกติ", desc: "ตรวจจับการชุมนุม การวิ่ง การทะเลาะ" },
      { icon: ShieldAlert, name: "บุกรุกพื้นที่", desc: "แจ้งเตือนเมื่อมีคนเข้าเขตหวงห้าม" },
    ]
  },
  {
    id: "urban",
    title: "เมืองอัจฉริยะ",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    functions: [
      { icon: Building2, name: "สิ่งปลูกสร้างใหม่", desc: "ตรวจจับอาคารสร้างใหม่/รุกล้ำ" },
      { icon: Car, name: "จราจร/ที่จอดรถ", desc: "นับรถ วิเคราะห์การจราจร ที่จอดผิด" },
      { icon: Users, name: "นับคน/ฝูงชน", desc: "ประเมินความหนาแน่นในงานอีเวนต์" },
    ]
  },
  {
    id: "environment",
    title: "สิ่งแวดล้อม",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    functions: [
      { icon: Waves, name: "น้ำท่วม/ระดับน้ำ", desc: "ติดตามระดับน้ำและพื้นที่น้ำท่วม" },
      { icon: TreePine, name: "พื้นที่ป่า/เกษตร", desc: "ตรวจสอบสุขภาพพืชและการบุกรุกป่า" },
      { icon: Factory, name: "มลพิษ/ฝุ่น", desc: "ตรวจจับควันโรงงาน การเผาในที่โล่ง" },
    ]
  }
];

export function AIFunctionsDiagram() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Animated Drones */}
      <FlyingDrone
        className="w-10 h-10"
        pathX={[0, -180, -350, -250, -80, 0]}
        pathY={[0, 60, 30, 90, 40, 0]}
        rotation={[0, -10, 5, -15, 8, 0]}
        duration={14}
        isAnimating={isAnimating}
        color="text-primary"
      />
      <FlyingDrone
        className="w-8 h-8"
        pathX={[0, 120, 280, 200, 60, 0]}
        pathY={[0, -30, -50, -20, -40, 0]}
        rotation={[0, 8, -5, 12, -8, 0]}
        duration={11}
        delay={3}
        isAnimating={isAnimating}
        color="text-emerald-500"
      />
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">AI Detection & Analytics</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          ระบบ AI ตรวจจับอัตโนมัติ
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          วิเคราะห์ภาพแบบ Real-time ด้วย AI ที่ฝึกมาเฉพาะงานความมั่นคงและสาธารณภัย
        </p>
      </motion.div>

      {/* Central Brain Hub */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto w-32 h-32 mb-8"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={isAnimating ? { scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/30"
          animate={isAnimating ? { scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <Eye className="w-8 h-8 text-white mx-auto mb-1" />
            <span className="text-[10px] text-white font-medium">AI Vision</span>
          </div>
        </div>
        
        {/* Connection lines */}
        {aiCategories.map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-primary/50 to-transparent origin-left"
            style={{
              width: "80px",
              transform: `rotate(${i * 120 - 90}deg)`,
            }}
            animate={isAnimating ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      {/* AI Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiCategories.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.15 }}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
            className={`relative p-6 rounded-2xl bg-card border-2 transition-all duration-300 ${
              activeCategory === category.id 
                ? `${category.borderColor} shadow-lg` 
                : "border-border hover:border-primary/30"
            }`}
          >
            {/* Category Header */}
            <motion.div 
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${category.color} mb-4`}
              animate={isAnimating && activeCategory === category.id ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Camera className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{category.title}</span>
            </motion.div>

            {/* Functions List */}
            <div className="space-y-3">
              {category.functions.map((func, funcIndex) => (
                <motion.div
                  key={func.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 + funcIndex * 0.1 }}
                  whileHover={{ x: 5 }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${category.bgColor} transition-all`}
                >
                  <motion.div 
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}
                    animate={isAnimating ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity, delay: funcIndex * 0.5 }}
                  >
                    <func.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{func.name}</p>
                    <p className="text-xs text-muted-foreground">{func.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary"
              animate={isAnimating && activeCategory === category.id 
                ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } 
                : { scale: 1, opacity: 0.5 }
              }
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Processing Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 p-6 rounded-2xl bg-secondary/50 border border-border"
      >
        <h4 className="text-center font-bold text-foreground mb-6">กระบวนการทำงาน AI</h4>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {[
            { icon: Camera, label: "รับภาพ", sublabel: "4K/Thermal" },
            { icon: Brain, label: "วิเคราะห์", sublabel: "AI Processing" },
            { icon: AlertTriangle, label: "ตรวจจับ", sublabel: "Detection" },
            { icon: Zap, label: "แจ้งเตือน", sublabel: "< 3 วินาที" },
          ].map((step, i) => (
            <motion.div 
              key={step.label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <motion.div 
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
                  animate={isAnimating ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <step.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.sublabel}</p>
                </div>
              </motion.div>
              {i < 3 && (
                <motion.div
                  className="hidden md:block"
                  animate={isAnimating ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  <div className="w-8 h-0.5 bg-primary/30" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
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
