'use client';

import { motion } from "framer-motion";
import { Factory, Building2, Zap, Truck, Anchor, Building, Landmark, Users } from "lucide-react";

const tier1Customers = [
  { icon: Factory, label: "นิคมอุตสาหกรรม" },
  { icon: Zap, label: "พลังงาน / โรงไฟฟ้า / ท่อส่ง" },
  { icon: Building2, label: "โครงสร้างพื้นฐานใหญ่ (ทางด่วน/สะพาน/เขื่อน)" },
  { icon: Truck, label: "Logistics Hub" },
];

const tier2Customers = [
  { icon: Landmark, label: "องค์กรรัฐวิสาหกิจ" },
  { icon: Building, label: "อบจ. / เทศบาลใหญ่" },
  { icon: Users, label: "หน่วยงานสาธารณภัย" },
];

export function CustomerPyramidDiagram() {
  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
          <h3 className="text-xl font-bold text-foreground">กลุ่มลูกค้า Enterprise เป้าหมาย (โฟกัสจริง)</h3>
        </div>
      </motion.div>

      {/* Pyramid */}
      <div className="max-w-3xl mx-auto">
        {/* Tier 1 - Core Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm">
              Tier 1 – Core Enterprise (ต้องได้)
            </span>
          </div>
          
          {/* Pyramid shape using CSS */}
          <div className="relative">
            <svg className="w-full h-48 md:h-64" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
              {/* Tier 1 Triangle */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                points="200,10 320,100 80,100"
                className="fill-blue-600"
              />
              
              {/* Tier 2 Trapezoid */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                points="80,105 320,105 360,180 40,180"
                className="fill-blue-400"
              />
              
              {/* Labels */}
              <text x="200" y="65" textAnchor="middle" className="fill-white text-xs font-bold">Tier 1</text>
              <text x="200" y="80" textAnchor="middle" className="fill-white/80 text-[10px]">Core Enterprise</text>
              
              <text x="200" y="140" textAnchor="middle" className="fill-white text-xs font-bold">Tier 2</text>
              <text x="200" y="155" textAnchor="middle" className="fill-white/80 text-[10px]">Public / Semi-Public</text>
            </svg>
          </div>
        </motion.div>

        {/* Tier Details */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Tier 1 Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30"
          >
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">1</div>
              Tier 1: Core Enterprise
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {tier1Customers.map((customer, i) => (
                <motion.div
                  key={customer.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-background/50"
                >
                  <customer.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs text-foreground">{customer.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tier 2 Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-5 rounded-2xl bg-blue-400/10 border border-blue-400/30"
          >
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-xs text-white font-bold">2</div>
              Tier 2: Public / Semi-Public
            </h4>
            <div className="space-y-2">
              {tier2Customers.map((customer, i) => (
                <motion.div
                  key={customer.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-background/50"
                >
                  <customer.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-foreground">{customer.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Focus Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
            <span className="text-destructive font-bold text-sm">&#x2715;</span>
            <span className="text-sm text-foreground">ไม่ใส่ SME</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-bold text-sm">&#x2713;</span>
            <span className="text-sm text-foreground">เอางานใหญ่ ใช้ยาว</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
