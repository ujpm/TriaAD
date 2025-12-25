import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('profile');
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl text-white mb-4">Register</h1>
          <p className="text-white/60 mb-10">
            Demo-only registration. This does not create a real account.
          </p>

          <GlassCard className="p-8" glowColor="green">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/80 mb-2">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#10B981] focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#10B981] focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#10B981] focus:outline-none"
                  placeholder="Create a password"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-lg text-white font-mono uppercase tracking-wider"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>

              <div className="text-center text-sm text-white/60">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-[#06B6D4] hover:text-[#10B981] transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
