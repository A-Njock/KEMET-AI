import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function AnimateIn({ children, delay = 0, className = '', direction = 'up' }: AnimateInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 28 : 0,
    x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
