import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'green' | 'amber' | 'none';
  locked?: boolean;
}

export function GlassCard({ children, className = '', glowColor = 'cyan', locked = false }: GlassCardProps) {
  const glowColors = {
    cyan: 'shadow-[0_0_20px_rgba(6,182,212,0.3)] border-[#06B6D4]',
    green: 'shadow-[0_0_20px_rgba(16,185,129,0.3)] border-[#10B981]',
    amber: 'shadow-[0_0_20px_rgba(251,191,36,0.3)] border-[#FBB020]',
    none: 'border-[#06B6D4]/30'
  };

  return (
    <div 
      className={`
        relative backdrop-blur-xl bg-white/10 rounded-2xl border-2 
        ${glowColors[glowColor]}
        ${locked ? 'opacity-60' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
