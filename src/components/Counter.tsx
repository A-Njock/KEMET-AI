import { useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({ to, suffix = '', duration = 1.8, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, to, { duration, ease: [0.16, 1, 0.3, 1] });
    }
  }, [isInView, to, duration, motionValue]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v) + suffix;
      }
    });
  }, [spring, suffix]);

  return (
    <span ref={inViewRef}>
      <span ref={ref} className={className}>0{suffix}</span>
    </span>
  );
}
