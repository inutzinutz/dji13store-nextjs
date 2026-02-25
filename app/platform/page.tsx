'use client';

import { ScrollSection } from "@/components/presentation/ScrollSection";
import { SlideTitle, SlideGrid, SlideCard } from "@/components/presentation/PresentationSlide";
import { motion } from "framer-motion";
import { 
  Cloud, Database, Shield, GitBranch, Calendar, Megaphone
} from "lucide-react";
import Link from 'next/link';
import { PlatformStrategicDiagram } from "@/components/platform/PlatformStrategicDiagram";
import { AIFunctionsDiagram } from "@/components/platform/AIFunctionsDiagram";
import { UseCasesDiagram } from "@/components/platform/UseCasesDiagram";

const keyFeatures = [
  { icon: Cloud, title: "On-Prem / Private Cloud", desc: "ติดตั้งในศูนย์ข้อมูลของคุณเอง" },
  { icon: Database, title: "Data Sovereignty", desc: "ข้อมูลอยู่ในประเทศไทย 100%" },
  { icon: Shield, title: "Security First", desc: "ระดับความปลอดภัยสำหรับงานรัฐ" },
  { icon: GitBranch, title: "Anti-Vendor Lock", desc: "ไม่ผูกขาดกับเจ้าใดเจ้าหนึ่ง" },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <ScrollSection variant="hero" id="hero">
          <SlideTitle
            badge="แผนงานแพลตฟอร์มโดรน UAV AI — เชิงยุทธศาสตร์ + ใช้งานจริง + ขายได้"
            title="UAV AI Platform"
            subtitle="Command & Intelligence Platform"
            description="ระบบปฏิบัติการโดรนอัจฉริยะของรัฐและองค์กรขนาดใหญ่"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto"
          >
            ไม่ใช่แอปดูภาพโดรน, ซอฟต์แวร์เสริมกล้อง — 
            <span className="text-foreground font-medium"> แต่คือ "Command & Intelligence Platform" สำหรับความมั่นคง / สาธารณภัย / โครงสร้างพื้นฐาน</span>
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link href="/contact">
              <button className="btn-navy">
                <Calendar size={20} />
                ขอ Demo Platform
              </button>
            </Link>
          </motion.div>
        </ScrollSection>

        {/* Positioning Section */}
        <ScrollSection id="positioning">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              1) Positioning ระดับประเทศ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">นิยามให้ชัดก่อน</h2>
          </div>
          <SlideGrid cols={4}>
            {keyFeatures.map((item, i) => (
              <SlideCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                index={i}
              />
            ))}
          </SlideGrid>
        </ScrollSection>

        {/* Core System Engine Section */}
        <ScrollSection id="core-engine">
          <PlatformStrategicDiagram />
        </ScrollSection>

        {/* AI Functions Section */}
        <ScrollSection id="ai-functions">
          <AIFunctionsDiagram />
        </ScrollSection>

        {/* Use Cases Section */}
        <ScrollSection id="use-cases">
          <UseCasesDiagram />
        </ScrollSection>

        {/* Key Message Section */}
        <ScrollSection variant="accent" id="key-message">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 mb-8"
            >
              <Megaphone className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Key Message</span>
            </motion.div>
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
            >
              "LM ไม่ได้ขายโดรน
              <br />
              <span className="text-primary">แต่ขายระบบตัดสินใจ</span>
              <br />
              ที่ทำให้รัฐไทยตอบสนองภัยได้เร็วกว่าเดิม"
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Link href="/contact">
                <button className="btn-navy">
                  <Calendar size={20} />
                  นัดพูดคุยกับทีม
                </button>
              </Link>
            </motion.div>
          </div>
        </ScrollSection>
      </main>
    </div>
  );
}
