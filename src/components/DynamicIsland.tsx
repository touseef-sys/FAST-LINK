import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Home, Info, Package, ShieldCheck, Users, Phone, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, href: '#home' },
  { label: 'About', icon: Info, href: '#about' },
  { label: 'Products', icon: Package, href: '#products' },
  { label: 'Why Us', icon: ShieldCheck, href: '#why-us' },
  { label: 'Clients', icon: Users, href: '#clients' },
  { label: 'Contact', icon: Phone, href: '#contact' },
];

export const DynamicIsland = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDark]);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-end md:justify-center pointer-events-none px-6 md:px-0">
      <motion.div
        className="pointer-events-auto glass-card flex items-center overflow-hidden shadow-2xl shadow-cyan-accent/10 mx-4"
        initial={false}
        animate={{
          width: isHovered ? 'min(90vw, 900px)' : 240,
          height: isHovered ? 'auto' : 60,
          minHeight: isHovered ? 80 : 60,
          borderRadius: isHovered ? 40 : 30,
          paddingLeft: isHovered ? 32 : 20,
          paddingRight: isHovered ? 32 : 20,
          paddingTop: isHovered ? 12 : 0,
          paddingBottom: isHovered ? 12 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full justify-center">
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white light:text-black font-bold text-sm tracking-widest uppercase whitespace-nowrap"
              >
                Fast Link Supply Chain
              </motion.div>
            )}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col md:flex-row items-center gap-6 w-full"
              >
                <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-2 md:pb-0 flex-grow">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-sm font-medium text-white light:text-black hover:text-cyan-accent transition-colors whitespace-nowrap"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
                
                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDark(!isDark);
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white light:text-black transition-colors"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
