'use client';

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Calculator, DollarSign, Clock, Users, TrendingUp,
  CheckCircle, ArrowRight, Calendar, BarChart3, Zap,
  Building2, Shield, Factory, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlyingDrone } from "@/components/icons/DroneIcon";

const useCaseOptions = [
  { value: "industrial", label: "Industrial Monitoring", icon: Factory, multiplier: 1.2 },
  { value: "infrastructure", label: "Infrastructure Inspection", icon: Building2, multiplier: 1.1 },
  { value: "security", label: "Security & Surveillance", icon: Shield, multiplier: 1.3 },
  { value: "disaster", label: "Disaster & Emergency", icon: AlertTriangle, multiplier: 1.0 },
];

export default function ROICalculatorPage() {
  // Input states
  const [useCase, setUseCase] = useState("industrial");
  const [areaSize, setAreaSize] = useState([500]); // ไร่
  const [currentStaff, setCurrentStaff] = useState([10]); // คน
  const [inspectionFrequency, setInspectionFrequency] = useState([4]); // ครั้ง/เดือน
  const [currentCostPerInspection, setCurrentCostPerInspection] = useState([50000]); // บาท

  // Calculate ROI
  const calculations = useMemo(() => {
    const selectedUseCase = useCaseOptions.find(u => u.value === useCase);
    const multiplier = selectedUseCase?.multiplier || 1;

    // Current costs (yearly)
    const yearlyInspections = inspectionFrequency[0] * 12;
    const currentYearlyCost = currentCostPerInspection[0] * yearlyInspections;
    const currentStaffCost = currentStaff[0] * 35000 * 12; // เงินเดือนเฉลี่ย
    const totalCurrentCost = currentYearlyCost + currentStaffCost;

    // Drone system costs
    const systemInvestment = areaSize[0] * 2000 + 1500000; // ค่าลงทุนเริ่มต้น
    const yearlyOperationCost = systemInvestment * 0.15; // MA 15%/ปี
    const reducedStaff = Math.ceil(currentStaff[0] * 0.3); // ลดคนได้ 70%
    const reducedStaffCost = reducedStaff * 35000 * 12;
    const totalDroneCost = yearlyOperationCost + reducedStaffCost;

    // Savings
    const yearlySavings = totalCurrentCost - totalDroneCost;
    const savingsPercent = Math.round((yearlySavings / totalCurrentCost) * 100);
    
    // ROI
    const paybackMonths = Math.ceil(systemInvestment / (yearlySavings / 12));
    const threeYearROI = Math.round(((yearlySavings * 3 - systemInvestment) / systemInvestment) * 100);

    // Efficiency gains
    const timeReduction = Math.round(60 + (areaSize[0] / 100) * multiplier);
    const coverageIncrease = Math.round(200 + (areaSize[0] / 50) * multiplier);
    const accidentReduction = 95;

    return {
      systemInvestment,
      totalCurrentCost,
      totalDroneCost,
      yearlySavings,
      savingsPercent: Math.min(savingsPercent, 75),
      paybackMonths: Math.max(paybackMonths, 4),
      threeYearROI: Math.min(threeYearROI, 400),
      reducedStaff,
      timeReduction: Math.min(timeReduction, 85),
      coverageIncrease: Math.min(coverageIncrease, 500),
      accidentReduction,
    };
  }, [useCase, areaSize, currentStaff, inspectionFrequency, currentCostPerInspection]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('th-TH').format(Math.round(value));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Drones */}
      <FlyingDrone
        className="w-11 h-11"
        pathX={[60, 220, 380, 280, 100, 60]}
        pathY={[130, 170, 110, 190, 150, 130]}
        rotation={[0, 10, -8, 12, -5, 0]}
        duration={17}
        color="text-primary/20"
      />
      <FlyingDrone
        className="w-9 h-9"
        pathX={[350, 180, 30, 150, 320, 350]}
        pathY={[250, 200, 230, 290, 220, 250]}
        rotation={[0, -10, 8, -10, 6, 0]}
        duration={15}
        delay={4}
        color="text-emerald-500/20"
      />
      <main className="pt-20 pb-16">
        <div className="section-container">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              ROI Calculator
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              คำนวณความคุ้มค่าจากการใช้ระบบโดรน
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ปรับค่าตามสถานการณ์จริงของคุณ เพื่อดูว่าระบบโดรนจะช่วยประหยัดได้เท่าไหร่
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border"
            >
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                ข้อมูลปัจจุบันของคุณ
              </h2>

              <div className="space-y-6">
                {/* Use Case */}
                <div className="space-y-2">
                  <Label className="text-foreground">ประเภทงาน</Label>
                  <Select value={useCase} onValueChange={setUseCase}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {useCaseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Size */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-foreground">พื้นที่ดูแล</Label>
                    <span className="text-primary font-bold">{formatCurrency(areaSize[0])} ไร่</span>
                  </div>
                  <Slider
                    value={areaSize}
                    onValueChange={setAreaSize}
                    min={100}
                    max={5000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100 ไร่</span>
                    <span>5,000 ไร่</span>
                  </div>
                </div>

                {/* Current Staff */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-foreground">จำนวนพนักงานตรวจสอบปัจจุบัน</Label>
                    <span className="text-primary font-bold">{currentStaff[0]} คน</span>
                  </div>
                  <Slider
                    value={currentStaff}
                    onValueChange={setCurrentStaff}
                    min={2}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2 คน</span>
                    <span>50 คน</span>
                  </div>
                </div>

                {/* Inspection Frequency */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-foreground">ความถี่ในการตรวจสอบ</Label>
                    <span className="text-primary font-bold">{inspectionFrequency[0]} ครั้ง/เดือน</span>
                  </div>
                  <Slider
                    value={inspectionFrequency}
                    onValueChange={setInspectionFrequency}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 ครั้ง/เดือน</span>
                    <span>30 ครั้ง/เดือน (รายวัน)</span>
                  </div>
                </div>

                {/* Cost Per Inspection */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-foreground">ค่าใช้จ่ายต่อครั้งตรวจสอบ</Label>
                    <span className="text-primary font-bold">฿{formatCurrency(currentCostPerInspection[0])}</span>
                  </div>
                  <Slider
                    value={currentCostPerInspection}
                    onValueChange={setCurrentCostPerInspection}
                    min={10000}
                    max={200000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>฿10,000</span>
                    <span>฿200,000</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Investment Summary */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  สรุปการลงทุน
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">ค่าลงทุนระบบโดรน</span>
                    <span className="font-bold text-foreground">฿{formatCurrency(calculations.systemInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <span className="text-muted-foreground">ค่าใช้จ่ายปัจจุบัน/ปี</span>
                    <span className="font-bold text-destructive">฿{formatCurrency(calculations.totalCurrentCost)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <span className="text-muted-foreground">ค่าใช้จ่ายหลังใช้โดรน/ปี</span>
                    <span className="font-bold text-primary">฿{formatCurrency(calculations.totalDroneCost)}</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-primary to-amber-600 text-white text-center"
                >
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ฿{formatCurrency(calculations.yearlySavings)}
                  </motion.p>
                  <p className="text-sm text-white/80">ประหยัดได้/ปี</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-center"
                >
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    {calculations.paybackMonths}
                  </motion.p>
                  <p className="text-sm text-white/80">เดือนคืนทุน</p>
                </motion.div>
              </div>

              {/* ROI & Efficiency */}
              <div className="p-6 rounded-2xl card-navy">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  ผลตอบแทนการลงทุน
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <motion.p 
                      className="text-4xl font-bold text-primary"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {calculations.threeYearROI}%
                    </motion.p>
                    <p className="text-sm text-white/70">ROI 3 ปี</p>
                  </div>
                  <div className="text-center">
                    <motion.p 
                      className="text-4xl font-bold text-primary"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      {calculations.savingsPercent}%
                    </motion.p>
                    <p className="text-sm text-white/70">ประหยัดค่าใช้จ่าย</p>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">ประโยชน์เพิ่มเติม</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">ลดเวลา</span>
                    <span className="font-bold text-foreground">{calculations.timeReduction}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Coverage</span>
                    <span className="font-bold text-foreground">+{calculations.coverageIncrease}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">คนที่ต้องการ</span>
                    <span className="font-bold text-foreground">{calculations.reducedStaff} คน</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">ลดอุบัติเหตุ</span>
                    <span className="font-bold text-foreground">{calculations.accidentReduction}%</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="flex-1">
                  <button className="btn-navy w-full">
                    <Calendar size={20} />
                    นัดพูดคุยโครงการ
                  </button>
                </Link>
                <Link href="/case-studies" className="flex-1">
                  <button className="btn-hero-secondary w-full">
                    ดู Case Studies
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto"
          >
            * ตัวเลขเป็นการประมาณการเบื้องต้น ผลลัพธ์จริงอาจแตกต่างกันตามสภาพแวดล้อมและความซับซ้อนของโครงการ
            กรุณาติดต่อทีมงานเพื่อรับการประเมินที่แม่นยำ
          </motion.p>
        </div>
      </main>
    </div>
  );
}
