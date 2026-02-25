'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Building, Target, Users, Layers, Briefcase, DollarSign, 
  UsersRound, GitBranch, Award, BarChart3, MessageSquareQuote,
  Cpu, Shield, HardHat, AlertTriangle, Factory, Building2, Zap,
  CheckCircle, ChevronRight, Cog, HeadphonesIcon
} from "lucide-react";

const objectives = [
  { id: "market", icon: Building, title: "ด้านตลาด", desc: "สร้างรายได้จาก Project + MA + Service ลูกค้า 1 ราย ใช้ยาวหลายปี", color: "from-blue-500 to-blue-600" },
  { id: "brand", icon: Target, title: "ด้านแบรนด์", desc: "ภาพจำ: \"ถ้าเป็นงานโดรนระดับองค์กร → ต้องคุย 13 STORE\"", color: "from-emerald-500 to-emerald-600" },
  { id: "org", icon: Users, title: "ด้านองค์กร", desc: "ทีม Enterprise แยกจาก Consumer ชัดเจน มี Presales / Solution / PM / Operation", color: "from-violet-500 to-violet-600" },
];

const solutionStack = [
  { layer: "4.1", title: "Hardware Layer", items: ["Drone (Multi-brand)", "VTOL / Dock / Autonomous System", "Payload (EO/IR/LiDAR)"], color: "bg-blue-600" },
  { layer: "4.2", title: "Platform Layer", items: ["UAV AI Operation Platform (เช่น LM)", "GIS / Dashboard / Data Management", "On-Prem / Private Cloud"], color: "bg-blue-500" },
  { layer: "4.3", title: "Service Layer", items: ["Survey / Inspection", "Monitoring 24/7, Emergency Response", "Data Analysis & Report"], color: "bg-blue-400" },
  { layer: "4.4", title: "Support Layer", items: ["MA รายปี, Training", "SOP / Operation Manual", "On-call Support"], color: "bg-blue-300" },
];

const useCases = [
  { id: "industrial", icon: Factory, title: "Industrial Monitoring", desc: "ตรวจโรงงาน / โครงสร้าง ลดคนขึ้นที่สูง ตรวจซ้ำตามรอบ", color: "from-blue-500 to-blue-600" },
  { id: "infrastructure", icon: Building2, title: "Infrastructure Inspection", desc: "เขื่อน / สะพาน / ทางด่วน รายงานเชิงวิศวกรรม", color: "from-emerald-500 to-emerald-600" },
  { id: "security", icon: Shield, title: "Security & Surveillance", desc: "นิคม / พื้นที่ห้าม ผูก Dock + AI Detection", color: "from-violet-500 to-violet-600" },
  { id: "disaster", icon: AlertTriangle, title: "Disaster & Emergency", desc: "น้ำท่วม / ไฟไหม้ / อุบัติเหตุใหญ่ ใช้งานทันที ไม่ต้องตั้งทีมใหม่", color: "from-amber-500 to-amber-600" },
];

const revenueModel = {
  primary: [
    "Project-based (System Integration)",
    "Platform License",
    "MA / Support รายปี",
  ],
  recurring: [
    "Monitoring Contract",
    "Drone-as-a-Service (DaaS)",
    "Training / Certification",
  ],
  target: "รายได้ MA 30-40% ของ Enterprise Revenue"
};

const teamStructure = [
  { role: "Enterprise Sales", desc: "คุย C-Level", icon: Users },
  { role: "Solution Engineer", desc: "ออกแบบระบบ", icon: Cog },
  { role: "Project Manager", desc: "บริหารโครงการ", icon: Briefcase },
  { role: "Operation / Pilot", desc: "ปฏิบัติการ", icon: Cpu },
  { role: "Support & MA", desc: "ดูแลหลังขาย", icon: HeadphonesIcon },
];

const salesProcess = [
  { step: "1", title: "เข้าใจ Pain ลูกค้า", desc: "ไม่ขายของก่อน" },
  { step: "2", title: "Site Survey / Workshop", desc: "เก็บข้อมูลจริง" },
  { step: "3", title: "Solution Design + Budget", desc: "ออกแบบระบบ" },
  { step: "4", title: "Pilot / Demo", desc: "พิสูจน์ผลงาน" },
  { step: "5", title: "Project Proposal", desc: "เสนอโครงการ" },
  { step: "6", title: "MA + Long-term Contract", desc: "สัญญาระยะยาว" },
];

const competitiveAdvantages = [
  "ทำได้จริงในไทย",
  "ทีมอยู่หน้างาน",
  "ไม่ทิ้งลูกค้า",
  "รองรับงานรัฐ / TOR",
  "ไม่ผูกยี่ห้อเดียว",
];

const kpis = [
  { metric: "≥ 5-10", label: "ลูกค้า Enterprise Active", unit: "ราย" },
  { metric: "≥ 1-3", label: "MA Contract", unit: "ปี" },
  { metric: "≥ 2", label: "Project Value ต่อดีล", unit: "หลักล้าน" },
  { metric: "≥ 3", label: "Case Study ใช้งานจริง", unit: "เคส" },
];

export function EnterpriseStrategicDiagram() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="py-8">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Enterprise Business Plan
        </h2>
        <p className="text-primary font-medium">
          "เงินจริง งานจริง ลูกค้าองค์กรจริง" — ไม่ลอย ไม่กว้างเกิน
        </p>
      </motion.div>

      {/* Section 1: Definition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
          <h3 className="text-xl font-bold text-foreground">นิยามธุรกิจ Enterprise ของ 13 STORE</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-destructive font-bold text-sm">&#x2715;</span>
              </div>
              <span className="font-bold text-destructive">ไม่ใช่</span>
            </div>
            <p className="text-foreground text-sm">ร้านขายโดรน, ตัวแทนจำหน่ายอุปกรณ์</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-primary">แต่คือ</span>
            </div>
            <p className="text-foreground text-sm font-medium">
              System Integrator + Solution Owner + Operation Partner
            </p>
          </div>
        </div>
        <motion.div 
          className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white"
          whileHover={{ scale: 1.01 }}
        >
          <p className="text-sm">
            <span className="font-bold">13 STORE Enterprise =</span> ผู้ให้บริการโซลูชัน Drone + AI + GIS + Operation แบบครบวงจร สำหรับองค์กรขนาดกลาง-ใหญ่ และภาครัฐ
          </p>
        </motion.div>
      </motion.div>

      {/* Section 2: Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
          <h3 className="text-xl font-bold text-foreground">เป้าหมายเชิงกลยุทธ์ (Enterprise Objectives)</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {objectives.map((obj, i) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${obj.color} flex items-center justify-center mb-4`}>
                <obj.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-foreground mb-2">{obj.title}</h4>
              <p className="text-sm text-muted-foreground">{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 4: Solution Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
          <h3 className="text-xl font-bold text-foreground">Enterprise Solution Stack ของ 13 STORE</h3>
        </div>
        <div className="space-y-3">
          {solutionStack.map((layer, i) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-stretch gap-4"
            >
              <div className={`${layer.color} text-white px-4 py-3 rounded-l-xl flex items-center justify-center min-w-[120px]`}>
                <span className="font-bold text-sm">{layer.layer} {layer.title.split(' ')[0]}</span>
              </div>
              <div className="flex-1 p-3 rounded-r-xl bg-secondary/50 border border-border">
                <p className="font-medium text-foreground text-sm mb-1">{layer.title}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item, j) => (
                    <span key={j} className="text-xs text-muted-foreground">&#x2022; {item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 5: Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
          <h3 className="text-xl font-bold text-foreground">Enterprise Use Case หลัก (ต้องขายให้เป็นแพ็ก)</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-5 rounded-2xl bg-card border border-border text-center"
            >
              <motion.div 
                className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${uc.color} flex items-center justify-center mb-3`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <uc.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h4 className="font-bold text-foreground text-sm mb-2">{uc.title}</h4>
              <p className="text-xs text-muted-foreground">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 6: Revenue Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 grid md:grid-cols-2 gap-6"
      >
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
            <h3 className="text-lg font-bold text-foreground">โมเดลรายได้ Enterprise</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-primary mb-2">6.1 รายได้หลัก</p>
              <ul className="space-y-1">
                {revenueModel.primary.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-2">6.2 รายได้ต่อเนื่อง</p>
              <ul className="space-y-1">
                {revenueModel.recurring.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <motion.div 
            className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-center text-sm font-bold text-primary">{revenueModel.target}</p>
          </motion.div>
        </div>

        {/* Section 7: Team Structure */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">7</span>
            <h3 className="text-lg font-bold text-foreground">โครงสร้างทีม Enterprise</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {teamStructure.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-3 rounded-xl bg-secondary/50 border border-border text-center"
              >
                <member.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="font-medium text-foreground text-xs">{member.role}</p>
                <p className="text-[10px] text-muted-foreground">{member.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-xs">
            <div className="flex items-center gap-1 text-destructive">
              <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center text-[10px]">&#x2715;</span>
              เซลล์อย่างเดียวไม่พอ
            </div>
            <div className="flex items-center gap-1 text-primary">
              <CheckCircle className="w-4 h-4" />
              ต้องขาย &quot;ความมั่นใจ&quot;
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 8: Sales Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">8</span>
          <h3 className="text-xl font-bold text-foreground">Enterprise Sales Process (ต้องเป็นระบบ)</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {salesProcess.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-3 rounded-xl bg-secondary/50 border border-border text-center min-w-[100px]"
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mb-1">
                  {step.step}
                </div>
                <p className="font-medium text-foreground text-xs">{step.title}</p>
                <p className="text-[10px] text-muted-foreground">{step.desc}</p>
              </motion.div>
              {i < salesProcess.length - 1 && (
                <ChevronRight className="w-4 h-4 text-primary mx-1" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 9 & 10: Advantages & KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8 grid md:grid-cols-2 gap-6"
      >
        {/* Competitive Advantages */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">9</span>
            <h3 className="text-lg font-bold text-foreground">จุดแข็งที่ต้องพูดทุกครั้ง</h3>
          </div>
          <div className="space-y-2">
            {competitiveAdvantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-primary/5"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{adv}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">10</span>
            <h3 className="text-lg font-bold text-foreground">KPI ระดับ Enterprise (ปีถัดไป)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-secondary/50 border border-border text-center"
              >
                <motion.p 
                  className="text-2xl font-bold text-primary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {kpi.metric}
                </motion.p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-[10px] text-primary font-medium">{kpi.unit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 11: Key Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-8 rounded-2xl card-navy text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-primary text-sm font-bold">11</span>
          <h3 className="text-xl font-bold text-white">Key Message สำหรับผู้บริหารลูกค้า</h3>
        </div>
        <motion.blockquote
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xl md:text-2xl font-bold text-white leading-relaxed"
        >
          <span className="text-4xl text-primary">&ldquo;</span>
          13 STORE ไม่ได้ขายโดรน
          <br />
          <span className="text-primary">แต่ดูแลภารกิจสำคัญขององค์กรคุณให้ปลอดภัย</span>
          <br />
          มีข้อมูล และตัดสินใจได้เร็วขึ้น
          <span className="text-4xl text-primary">&rdquo;</span>
        </motion.blockquote>
      </motion.div>
    </div>
  );
}
