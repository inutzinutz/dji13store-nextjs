'use client';

import { motion } from "framer-motion";
import { 
  MapPin, Radio, Building, Shield, Users, AlertTriangle, 
  Globe, Network, ArrowRight, Zap
} from "lucide-react";
import { useState } from "react";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const dockLocations = [
  { id: 1, x: 30, y: 25, label: "ภาคเหนือ" },
  { id: 2, x: 70, y: 20, label: "ภาคอีสาน" },
  { id: 3, x: 25, y: 50, label: "ภาคกลาง" },
  { id: 4, x: 75, y: 55, label: "ภาคตะวันออก" },
  { id: 5, x: 35, y: 75, label: "ภาคใต้ตอนบน" },
  { id: 6, x: 45, y: 90, label: "ภาคใต้ตอนล่าง" },
];

const controlCenters = [
  { id: "central", label: "ศูนย์กลาง", icon: Building, color: "bg-primary" },
  { id: "regional", label: "ศูนย์ภูมิภาค", icon: Network, color: "bg-blue-500" },
  { id: "provincial", label: "ศูนย์จังหวัด", icon: MapPin, color: "bg-emerald-500" },
];

const agencyList = [
  { icon: Shield, label: "กองทัพ" },
  { icon: Users, label: "ตำรวจ" },
  { icon: AlertTriangle, label: "ปภ." },
  { icon: Globe, label: "ทรัพยากรฯ" },
];

export function DeploymentDiagram() {
  const [hoveredDock, setHoveredDock] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="py-8 relative overflow-hidden">
      {/* Flying Drones over the map */}
      <FlyingDrone
        className="w-10 h-10"
        pathX={[50, 200, 350, 250, 100, 50]}
        pathY={[80, 120, 60, 100, 140, 80]}
        rotation={[0, 10, -8, 12, -5, 0]}
        duration={15}
        isAnimating={isAnimating}
        color="text-primary"
      />
      <FlyingDrone
        className="w-8 h-8"
        pathX={[300, 180, 50, 150, 280, 300]}
        pathY={[150, 100, 130, 180, 120, 150]}
        rotation={[0, -8, 10, -6, 8, 0]}
        duration={18}
        delay={4}
        isAnimating={isAnimating}
        color="text-amber-500"
      />
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          โครงข่ายระดับประเทศ
        </h3>
        <p className="text-muted-foreground">
          National VTOL Network: Dock ทุก 50-80 กม. เชื่อมเป็น Drone Security Grid
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Thailand Map with Dock Locations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] max-w-md mx-auto w-full"
        >
          {/* Map background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border border-border overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }} />

            {/* Thailand shape (simplified) */}
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full p-4">
              <defs>
                <linearGradient id="thailandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Simplified Thailand outline */}
              <motion.path
                d="M40,5 L60,8 L70,15 L75,25 L80,35 L75,45 L70,50 L75,60 L70,70 L60,75 L50,85 L45,95 L40,105 L35,115 L30,105 L25,90 L20,75 L25,60 L30,50 L25,40 L30,30 L35,20 L40,10 Z"
                fill="url(#thailandGradient)"
                stroke="hsl(38 92% 50%)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />

              {/* Connection lines between docks */}
              {dockLocations.map((dock, i) => 
                dockLocations.slice(i + 1).map((otherDock) => (
                  <motion.line
                    key={`${dock.id}-${otherDock.id}`}
                    x1={dock.x}
                    y1={dock.y}
                    x2={otherDock.x}
                    y2={otherDock.y}
                    stroke="hsl(38 92% 50%)"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                ))
              )}
            </svg>

            {/* Dock markers */}
            {dockLocations.map((dock, i) => (
              <motion.div
                key={dock.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="absolute"
                style={{ 
                  left: `${dock.x}%`, 
                  top: `${dock.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                onMouseEnter={() => setHoveredDock(dock.id)}
                onMouseLeave={() => setHoveredDock(null)}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={isAnimating ? { 
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  style={{ width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
                />
                
                {/* Dock icon */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className={`relative w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    hoveredDock === dock.id 
                      ? "bg-primary shadow-lg shadow-primary/50" 
                      : "bg-primary/80"
                  }`}
                >
                  <Radio className="w-3 h-3 text-white" />
                </motion.div>

                {/* Label tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={hoveredDock === dock.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap z-10"
                >
                  {dock.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Control Hierarchy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Control Centers */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="font-bold text-foreground mb-4">ลำดับชั้นการควบคุม</h4>
            <div className="space-y-4">
              {controlCenters.map((center, i) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-xl ${center.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <center.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{center.label}</p>
                  </div>
                  {i < controlCenters.length - 1 && (
                    <motion.div
                      animate={isAnimating ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connected Agencies */}
          <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
            <h4 className="font-bold text-foreground mb-4">หน่วยงานที่เชื่อมต่อ</h4>
            <div className="grid grid-cols-2 gap-3">
              {agencyList.map((agency, i) => (
                <motion.div
                  key={agency.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                >
                  <agency.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{agency.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
            >
              <motion.span 
                className="text-3xl font-bold text-primary"
                animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                50-80
              </motion.span>
              <p className="text-sm text-muted-foreground">กม. ต่อ Dock</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
            >
              <motion.span 
                className="text-3xl font-bold text-emerald-500"
                animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                24/7
              </motion.span>
              <p className="text-sm text-muted-foreground">ปฏิบัติการต่อเนื่อง</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Toggle animation */}
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
