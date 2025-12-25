import { motion } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'app', label: 'Start Screening' },
    { id: 'login', label: 'Login' },
    { id: 'register', label: 'Register' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0F172A]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3"
          >
            <div className="text-2xl tracking-wider text-white">
              Tri<span className="text-[#06B6D4]">AD</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#10B981]"
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(16, 185, 129, 0.5)',
                    '0 0 10px rgba(16, 185, 129, 0.8)',
                    '0 0 5px rgba(16, 185, 129, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className="text-[#10B981] text-xs font-mono">LIVE</span>
            </div>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-mono uppercase tracking-wider transition-colors ${
                  currentPage === item.id
                    ? 'text-[#06B6D4]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
