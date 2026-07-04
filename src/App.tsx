/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import DashboardLayout from './components/DashboardLayout';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechMarquee from './components/TechMarquee';
import SkillsSection from './components/SkillsSection';
import ProjectsGrid from './components/ProjectsGrid';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <DashboardLayout>
      {/* 01. Terminal Hero Workspace */}
      <HeroSection />

      {/* 02. Academic Bento Bio & Stats Counters */}
      <AboutSection />

      {/* 03. Infinite Rolling Tech Ticker */}
      <TechMarquee />

      {/* 04. 3D-Tilt Core Competency Cards */}
      <SkillsSection />

      {/* 05. Production SaaS Project Grid */}
      <ProjectsGrid />

      {/* 06. GEC Education Path Audit Timeline */}
      <EducationSection />

      {/* 07. Support Gateway Mail Connector */}
      <ContactSection />
    </DashboardLayout>
  );
}
