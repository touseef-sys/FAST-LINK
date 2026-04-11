import { motion } from 'motion/react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      <div className="relative group">
        <motion.div 
          className="absolute -inset-2 bg-cyan-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <img 
          src="https://fastlinksc.net/images/logo.jpg" 
          alt="Fast Link Logo" 
          className="h-12 w-auto rounded-lg relative z-10 border border-white/10 shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="speed-streak-container absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="speed-streak opacity-30" />
        </div>
      </div>
    </motion.div>
  );
};
