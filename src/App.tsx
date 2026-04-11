import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { DynamicIsland } from './components/DynamicIsland';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';
import { Logo } from './components/Logo';
import { products, clients } from './data';
import { Product, CartItem } from './types';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Truck, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'store' | 'checkout'>('store');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (view === 'checkout') {
    return (
      <Checkout 
        total={total} 
        onBack={() => setView('store')} 
        onComplete={() => {
          setCart([]);
          setView('store');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-midnight selection:bg-cyan-accent selection:text-white transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-accent z-[60] origin-left" style={{ scaleX }} />
      
      {/* Top Left Logo */}
      <div className="fixed top-6 left-6 z-50">
        <Logo />
      </div>

      <DynamicIsland />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/logistics/1920/1080?blur=5')] bg-cover bg-center opacity-40 transition-opacity duration-500" />
          
          {/* Animated Grid */}
          <div 
            className="absolute inset-0 opacity-[0.15] light:opacity-[0.05]" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              animation: 'grid-flow 4s linear infinite'
            }} 
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-accent rounded-full opacity-20"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                scale: Math.random() * 2
              }}
              animate={{ 
                y: [null, '-20%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Scan Line */}
          <div 
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent opacity-20 pointer-events-none"
            style={{ animation: 'scan-line 8s ease-in-out infinite' }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight opacity-60" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-x-20 -inset-y-10 bg-cyan-accent/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />
            <h1 className="text-5xl md:text-7xl font-script text-white light:text-black mb-6 tracking-tight transition-colors relative z-10">
              Powering Industries with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-electric drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                Precision & Speed
              </span>
            </h1>
            <p className="text-xl text-white/60 light:text-black mb-12 max-w-2xl mx-auto leading-relaxed transition-colors relative z-10">
              Fast Link is your authorized partner for high-grade mechanical parts, 
              electrical supplies, and safety equipment. Innovating for a secure tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#products">
                <button className="px-8 py-4 bg-electric hover:bg-cyan-accent hover:text-midnight text-white font-bold rounded-full transition-all flex items-center gap-2 group shadow-xl shadow-electric/20">
                  Explore Supplies
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="#about">
                <button className="px-8 py-4 glass-card hover:bg-white/10 text-white font-bold transition-all">
                  Our Mission
                </button>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-cyan-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Clients Marquee */}
      <section id="clients" className="py-20 bg-white/5 light:bg-white/10 border-y border-white/5 light:border-black/10 overflow-hidden transition-colors">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-accent mb-2">Our Clients</h2>
          <p className="text-white/60 light:text-black transition-colors">Leading organizations rely on Fast Link for critical supplies</p>
        </div>
        <div className="flex gap-24 animate-marquee whitespace-nowrap w-max">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center gap-8 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 shrink-0">
              <img src={client.logo} alt={client.name} className="h-14 w-auto rounded-lg" referrerPolicy="no-referrer" />
              <span className="text-2xl font-display font-bold text-white/80 light:text-black transition-colors">{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white light:text-black mb-8">
              Innovating for a <br />
              <span className="text-cyan-accent">Secure Tomorrow</span>
            </h2>
            <div className="space-y-6 text-white/60 light:text-black text-lg leading-relaxed">
              <p>
                Fast Link is a leading provider of industrial solutions, committed to delivering 
                excellence through innovation and reliability. We specialize in sourcing and 
                supplying critical components that power the modern world.
              </p>
              <p>
                Our mission is to bridge the gap between global manufacturers and local industries, 
                ensuring that every project has access to the highest quality supplies with 
                unmatched delivery speeds.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-display font-bold text-white light:text-black mb-2">15+</div>
                <div className="text-sm text-cyan-accent uppercase tracking-widest">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-white light:text-black mb-2">500+</div>
                <div className="text-sm text-cyan-accent uppercase tracking-widest">Corporate Clients</div>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute -inset-4 bg-electric/20 blur-3xl rounded-full" />
            <img 
              src="https://picsum.photos/seed/warehouse/800/600" 
              alt="Industrial Warehouse" 
              className="relative rounded-3xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-6 bg-white/[0.02] light:bg-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white light:text-black mb-4">Industrial Supplies</h2>
              <p className="text-white/60 light:text-black max-w-xl">Browse our curated selection of professional-grade equipment and parts.</p>
            </div>
            <div className="flex gap-4">
              {['All', 'Mechanical', 'Electrical', 'Safety', 'Tools'].map(cat => (
                <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 light:border-black/10 hover:border-cyan-accent hover:text-cyan-accent transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white light:text-black mb-4">Why Choose Fast Link?</h2>
            <p className="text-white/60 light:text-black">The industry standard in logistics and supply chain management.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Authorized Supplier', desc: 'Direct partnerships with global manufacturers ensuring genuine products.' },
              { icon: Award, title: 'Quality Assurance', desc: 'Rigorous testing and certification for every component we supply.' },
              { icon: Clock, title: '24/7 Support', desc: 'Dedicated technical support team available around the clock.' },
              { icon: Truck, title: 'Rapid Logistics', desc: 'Proprietary distribution network for lightning-fast delivery.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 text-center group light:bg-white light:shadow-lg light:border-black/10"
              >
                <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-accent group-hover:text-white transition-colors">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-white light:text-black mb-4">{feature.title}</h3>
                <p className="text-white/60 light:text-black text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white/[0.02] light:bg-white/5 transition-colors">
        <div className="container mx-auto">
          <div className="glass-card p-12 lg:p-20 relative overflow-hidden light:bg-white light:shadow-lg light:border-black/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-electric/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
              <div>
                <h2 className="text-4xl font-display font-bold text-white light:text-black mb-8 transition-colors">Get in Touch</h2>
                <p className="text-white/60 light:text-black mb-12 text-lg transition-colors">
                  Ready to transform your organization's supply chain? Our experts are standing by to assist you.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 light:bg-black/5 rounded-full flex items-center justify-center text-cyan-accent transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 uppercase tracking-widest mb-1 transition-colors">Email Us</div>
                      <div className="text-xl text-white light:text-black font-medium transition-colors">info@fastlinksc.net</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 light:bg-black/5 rounded-full flex items-center justify-center text-cyan-accent transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 uppercase tracking-widest mb-1 transition-colors">Call Us</div>
                      <div className="text-xl text-white light:text-black font-medium transition-colors">+92 21 3456 7890</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 light:bg-black/5 rounded-full flex items-center justify-center text-cyan-accent transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 uppercase tracking-widest mb-1 transition-colors">Visit Us</div>
                      <div className="text-xl text-white light:text-black font-medium transition-colors">Industrial Area, Karachi, Pakistan</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-cyan-accent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Company</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-cyan-accent outline-none transition-all" placeholder="Industrial Corp" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-cyan-accent outline-none transition-all" placeholder="How can we help you?" />
                </div>
                <button className="w-full py-4 bg-electric hover:bg-cyan-accent hover:text-white font-bold rounded-lg transition-all shadow-lg shadow-electric/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 light:border-black/10 light:bg-white/5 transition-colors">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <p className="text-white/40 light:text-black text-sm leading-relaxed transition-colors">
                Fast Link is a premier industrial supply and logistics partner, 
                dedicated to powering global industries with precision-engineered 
                solutions and rapid connectivity.
              </p>
            </div>
            <div>
              <h4 className="text-white light:text-black font-bold mb-6 transition-colors">Quick Links</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#home" className="hover:text-cyan-accent transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-cyan-accent transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-cyan-accent transition-colors">Products</a></li>
                <li><a href="#why-us" className="hover:text-cyan-accent transition-colors">Why Choose Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white light:text-black font-bold mb-6 transition-colors">Categories</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Mechanical Parts</a></li>
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Electrical Supplies</a></li>
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Safety Equipment</a></li>
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Industrial Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white light:text-black font-bold mb-6 transition-colors">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/112822230/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-cyan-accent hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-cyan-accent hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-cyan-accent hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 light:border-black/10 text-white/40 text-xs transition-colors">
            <p>© 2026 Fast Link Supply Chain. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white/60 light:hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 light:hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 light:hover:text-black transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        cart={cart} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeFromCart} 
        onCheckout={() => setView('checkout')}
      />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
