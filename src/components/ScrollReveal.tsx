import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  staggerChildren?: boolean;
  key?: any;
}

export default function ScrollReveal({
  children,
  delay = 0,
  yOffset = 20,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.08,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  key?: any;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  yOffset = 15,
  className = '',
}: {
  children: ReactNode;
  yOffset?: number;
  className?: string;
  key?: any;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
