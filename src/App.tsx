/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import DashboardLayout from './components/DashboardLayout';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LeetCodeSection from './components/LeetCodeSection';
import SkillsSection from './components/SkillsSection';
import ProjectsGrid from './components/ProjectsGrid';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import WelcomePreloader from './components/WelcomePreloader';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeHighlight, setActiveHighlight] = useState<{ type: 'category' | 'skill'; value: string } | null>(null);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <WelcomePreloader key="preloader" onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <DashboardLayout>
        {/* 01. Terminal Hero Workspace */}
        <HeroSection />

        {/* 02. Academic Bento Bio & Stats Counters */}
        <AboutSection />

        {/* 03. LeetCode Coding Activity Dashboard */}
        <LeetCodeSection />

        {/* 04. 3D-Tilt Core Competency Cards */}
        <SkillsSection 
          activeHighlight={activeHighlight} 
          onHighlightChange={setActiveHighlight} 
        />

        {/* 05. Production SaaS Project Grid */}
        <ProjectsGrid 
          activeHighlight={activeHighlight} 
          onClearHighlight={() => setActiveHighlight(null)} 
        />

        {/* 06. GEC Education Path Audit Timeline */}
        <EducationSection />

        {/* 07. Support Gateway Mail Connector */}
        <ContactSection />
      </DashboardLayout>
    </>
  );
}
