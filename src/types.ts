export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  stars?: string;
  metric?: string;
}

export interface EducationMilestone {
  id: string;
  period: string;
  title: string;
  institution: string;
  description: string;
  badge?: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}
