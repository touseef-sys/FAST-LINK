import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Wallet, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface CheckoutProps {
  total: number;
  onBack: () => void;
  onComplete: () => void;
}

export const Checkout = ({ total, onBack, onComplete }: CheckoutProps) => {
  const [method, setMethod] = useState<'card' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(onComplete, 3000);
    }, 2000);
  };

  if (isDone) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-cyan-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-cyan-accent" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white light:text-black mb-4 transition-colors">Order Confirmed!</h2>
          <p className="text-white/60 light:text-black mb-8 transition-colors">Your industrial supplies are being prepared for rapid dispatch. You will receive a tracking number shortly.</p>
          <div className="animate-pulse text-cyan-accent font-mono">Redirecting to home...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-8 text-white/40 hover:text-white">
        <ArrowLeft className="mr-2" /> Back to Store
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-display font-bold text-white light:text-black">Secure Checkout</h2>
          
          <div className="flex gap-4">
            <button
              onClick={() => setMethod('card')}
              className={`flex-1 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                method === 'card' ? 'bg-electric/20 border-cyan-accent text-white light:text-black' : 'bg-white/5 border-white/10 text-white/40 light:bg-black/5 light:border-black/10'
              }`}
            >
              <CreditCard size={24} />
              <span className="text-sm font-medium">Credit Card</span>
            </button>
            <button
              onClick={() => setMethod('wallet')}
              className={`flex-1 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                method === 'wallet' ? 'bg-electric/20 border-cyan-accent text-white light:text-black' : 'bg-white/5 border-white/10 text-white/40 light:bg-black/5 light:border-black/10'
              }`}
            >
              <Wallet size={24} />
              <span className="text-sm font-medium">Digital Wallet</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white/60 light:text-black">Email Address</Label>
                <Input id="email" type="email" placeholder="procurement@company.com" className="bg-white/5 border-white/10 text-white light:bg-white light:border-black/10 light:text-black" required />
              </div>
              
              {method === 'card' ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="card" className="text-white/60 light:text-black">Card Number</Label>
                    <Input id="card" placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 text-white light:bg-white light:border-black/10 light:text-black" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry" className="text-white/60 light:text-black">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="bg-white/5 border-white/10 text-white light:bg-white light:border-black/10 light:text-black" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv" className="text-white/60 light:text-black">CVV</Label>
                      <Input id="cvv" placeholder="123" className="bg-white/5 border-white/10 text-white light:bg-white light:border-black/10 light:text-black" required />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center light:bg-black/5 light:border-black/10">
                  <p className="text-white/60 light:text-black mb-4">Select your preferred digital wallet</p>
                  <div className="flex justify-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-lg light:bg-black/10" />
                    <div className="w-12 h-12 bg-white/10 rounded-lg light:bg-black/10" />
                    <div className="w-12 h-12 bg-white/10 rounded-lg light:bg-black/10" />
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-electric hover:bg-cyan-accent hover:text-midnight h-14 font-bold text-xl shadow-lg shadow-electric/20"
            >
              {isProcessing ? 'Processing Transaction...' : `Pay $${total.toLocaleString()}`}
            </Button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card p-8 h-fit sticky top-32 light:bg-white light:shadow-lg light:border-black/10 transition-colors"
        >
          <h3 className="text-xl font-display font-bold text-white light:text-black mb-6 transition-colors">Order Summary</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-white/60 light:text-black transition-colors">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/60 light:text-black transition-colors">
              <span>Shipping (Express)</span>
              <span className="text-cyan-accent font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-white/60 light:text-black transition-colors">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
          </div>
          <Separator className="bg-white/10 light:bg-black/10 mb-6 transition-colors" />
          <div className="flex justify-between items-end mb-8">
            <span className="text-white/60 light:text-black transition-colors">Total Amount</span>
            <span className="text-3xl font-display font-bold text-white light:text-black transition-colors">${total.toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-lg bg-cyan-accent/5 border border-cyan-accent/20 flex gap-3">
            <CheckCircle2 className="text-cyan-accent shrink-0" size={20} />
            <p className="text-xs text-white/40">Authorized Supplier Guarantee: All products are genuine and come with full manufacturer warranty.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
