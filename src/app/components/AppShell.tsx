import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppShellProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

export function AppShell({ currentPage, onNavigate, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1">{children}</div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
