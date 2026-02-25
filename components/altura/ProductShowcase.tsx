'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Weight, Ruler, Radio, Wind, Thermometer, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  model: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: {
    endurance: string;
    payload: string;
    wingspan: string;
    maxSpeed: string;
    range: string;
    windResistance: string;
    temperature: string;
  };
  highlights: string[];
}

const products: Product[] = [
  {
    id: "at-v12",
    model: "AT-V12",
    name: "VTOL UAV",
    category: "ตรวจตรา / สำรวจ / ลาดตระเวน",
    description: "โดรนปีกตรึงขึ้น-ลงแนวตั้ง น้ำหนักเบา บินได้นาน เหมาะสำหรับภารกิจตรวจตราพื้นที่กว้าง",
    image: "/assets/altura/uav-v12-clean.jpg",
    specs: {
      endurance: "3 ชม.",
      payload: "1.5 กก.",
      wingspan: "2.25 ม.",
      maxSpeed: "35 ม./วิ",
      range: "30 กม.",
      windResistance: "ระดับ 6",
      temperature: "-20 ถึง 45°C",
    },
    highlights: ["ขึ้น-ลงแนวตั้ง", "ติดตั้งง่าย", "บินได้ในฝนเบา"],
  },
  {
    id: "at-v15",
    model: "AT-V15",
    name: "VTOL UAV",
    category: "ตรวจตรา / สำรวจ / ลาดตระเวน",
    description: "โดรน VTOL อเนกประสงค์ ออกแบบแบบโมดูลาร์ รองรับการติดตั้งอุปกรณ์หลากหลาย",
    image: "/assets/altura/uav-v15-clean.jpg",
    specs: {
      endurance: "3 ชม.",
      payload: "3 กก.",
      wingspan: "3.35 ม.",
      maxSpeed: "40 ม./วิ",
      range: "30 กม.",
      windResistance: "ระดับ 5",
      temperature: "-20 ถึง 45°C",
    },
    highlights: ["Modular Design", "หลายภารกิจ", "ติดตั้งรวดเร็ว"],
  },
  {
    id: "at-v30",
    model: "AT-V30",
    name: "VTOL UAV",
    category: "ตรวจตรา / สำรวจ / ลาดตระเวน",
    description: "โดรนปีกตรึง VTOL ไฟฟ้าเต็มรูปแบบ รองรับ Payload สูงสุด 5 กก. เหมาะสำหรับภารกิจหลากหลาย",
    image: "/assets/altura/uav-v30-clean.jpg",
    specs: {
      endurance: "3 ชม.",
      payload: "5 กก.",
      wingspan: "4.0 ม.",
      maxSpeed: "40 ม./วิ",
      range: "30-50 กม.",
      windResistance: "ระดับ 6",
      temperature: "-20 ถึง 45°C",
    },
    highlights: ["ไฟฟ้า 100%", "Payload สูง", "ลงจอดอัตโนมัติ"],
  },
  {
    id: "at-v50e",
    model: "AT-V50E",
    name: "Tilt-Wing VTOL",
    category: "ตรวจตรา / สำรวจ / ลาดตระเวน",
    description: "โดรนปีกพับไฟฟ้า บรรทุกได้หนัก 15 กก. เหมาะสำหรับภารกิจที่ต้องการอุปกรณ์หลายชนิด",
    image: "/assets/altura/uav-v50e-clean.jpg",
    specs: {
      endurance: "3 ชม.",
      payload: "15 กก.",
      wingspan: "4.85 ม.",
      maxSpeed: "40 ม./วิ",
      range: "50-100 กม.",
      windResistance: "ระดับ 7",
      temperature: "-20 ถึง 45°C",
    },
    highlights: ["Heavy Payload", "Tilt-Wing", "ครอบคลุมกว้าง"],
  },
  {
    id: "at-v50h",
    model: "AT-V50H",
    name: "Hybrid VTOL",
    category: "ตรวจตรา / สำรวจ / ลาดตระเวน",
    description: "โดรนไฮบริด บินนานถึง 8 ชม. ใช้เครื่องยนต์ 120cc พร้อม Generator สำหรับภารกิจระยะไกล",
    image: "/assets/altura/uav-v50h-clean.jpg",
    specs: {
      endurance: "8 ชม.",
      payload: "15 กก.",
      wingspan: "4.85 ม.",
      maxSpeed: "40 ม./วิ",
      range: "50-100 กม.",
      windResistance: "ระดับ 7",
      temperature: "-20 ถึง 45°C",
    },
    highlights: ["Hybrid Power", "บินนาน 8 ชม.", "Generator 800W"],
  },
  {
    id: "at-v105",
    model: "AT-V105",
    name: "Freight UAV",
    category: "โลจิสติกส์และขนส่ง",
    description: "โดรนขนส่งสินค้า บรรทุกได้ 20 กก. ออกแบบสำหรับ Last-mile Delivery และภารกิจฉุกเฉิน",
    image: "/assets/altura/uav-v105-clean.jpg",
    specs: {
      endurance: "90 นาที",
      payload: "20 กก.",
      wingspan: "6.0 ม.",
      maxSpeed: "126 กม./ชม.",
      range: "128 กม.",
      windResistance: "ระดับ 7",
      temperature: "-20 ถึง 50°C",
    },
    highlights: ["ขนส่งสินค้า", "96 ลิตร", "Precision Landing"],
  },
  {
    id: "at-v150",
    model: "AT-V150",
    name: "Heavy-lift VTOL",
    category: "สื่อสารฉุกเฉิน",
    description: "โดรน Heavy-lift บินนาน 8 ชม. บรรทุก 40 กก. สำหรับระบบสื่อสารฉุกเฉินและภารกิจพิเศษ",
    image: "/assets/altura/uav-v150-clean.jpg",
    specs: {
      endurance: "8 ชม.",
      payload: "40 กก.",
      wingspan: "6.12 ม.",
      maxSpeed: "150 กม./ชม.",
      range: "800 กม.",
      windResistance: "ระดับ 8",
      temperature: "-20 ถึง 50°C",
    },
    highlights: ["Heavy-lift", "บินไกล 800 กม.", "Satcom Ready"],
  },
  {
    id: "at-ua01",
    model: "AT-UA01",
    name: "Intelligent UAV Airport",
    category: "สนามบินโดรนอัจฉริยะ",
    description: "ระบบท่าจอดโดรนอัตโนมัติ รองรับการบินลาดตระเวน ชาร์จ และควบคุมระยะไกล 24/7",
    image: "/assets/altura/uav-ua01-clean.jpg",
    specs: {
      endurance: "120 นาที",
      payload: "5 กก.",
      wingspan: "3.8 ม.",
      maxSpeed: "79.2 กม./ชม.",
      range: "80 กม.",
      windResistance: "ระดับ 7",
      temperature: "-30 ถึง 55°C",
    },
    highlights: ["Auto Landing", "Remote Control", "4G/5G Connected"],
  },
];

const specIcons = {
  endurance: Clock,
  payload: Weight,
  wingspan: Ruler,
  maxSpeed: ArrowRight,
  range: Radio,
  windResistance: Wind,
  temperature: Thermometer,
};

const specLabels: Record<string, string> = {
  endurance: "ระยะเวลาบิน",
  payload: "บรรทุกสูงสุด",
  wingspan: "ความกว้างปีก",
  maxSpeed: "ความเร็วสูงสุด",
  range: "ระยะควบคุม",
  windResistance: "ทนลม",
  temperature: "อุณหภูมิใช้งาน",
};

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="py-8">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          ผลิตภัณฑ์ Altura
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          เลือกโดรนที่เหมาะกับภารกิจ
        </h3>
        <p className="text-muted-foreground">
          {products.length} รุ่น ครอบคลุมทุกความต้องการ
        </p>
      </motion.div>

      {/* Main showcase */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Product Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted dark:from-secondary dark:to-muted">
            <Image
              src={currentProduct.image}
              alt={`${currentProduct.model} ${currentProduct.name}`}
              fill
              className="object-cover"
            />
            {/* Model badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {currentProduct.model}
            </div>
            {/* Category badge */}
            <div className="absolute bottom-4 left-4 right-4 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm text-white">
              <p className="text-xs text-white/70">{currentProduct.category}</p>
              <p className="font-semibold">{currentProduct.name}</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                {currentProduct.model} {currentProduct.name}
              </h4>
              <p className="text-muted-foreground">
                {currentProduct.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {currentProduct.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(currentProduct.specs) as Array<keyof typeof currentProduct.specs>).map((key) => {
                const Icon = specIcons[key];
                return (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-card border border-border flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{specLabels[key]}</p>
                      <p className="text-sm font-semibold text-foreground">{currentProduct.specs[key]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevProduct}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-primary w-6"
                    : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextProduct}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {products.map((product, i) => (
            <button
              key={product.id}
              onClick={() => setCurrentIndex(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === currentIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={product.image}
                alt={product.model}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
