interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl text-white mb-4">
              Tri<span className="text-[#06B6D4]">AD</span>
            </h3>
            <p className="text-white/60 text-sm">
              Democratizing Alzheimer's Detection through Progressive Multi-Agent Triage
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-mono text-sm mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('app')}
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  Start Screening
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-mono text-sm mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-mono text-sm mb-4">DISCLAIMER</h4>
            <p className="text-white/60 text-xs">
              TriAD is a screening tool, not a diagnostic device. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/40 text-xs font-mono">
            © 2025 TriAD Agents. Built for Health Equity.
          </p>
        </div>
      </div>
    </footer>
  );
}
