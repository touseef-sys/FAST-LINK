import { CartItem } from '../types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface CartDrawerProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ cart, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger 
        render={
          <Button variant="outline" className="fixed bottom-8 right-8 h-16 w-16 rounded-full glass-card border-cyan-accent/30 text-cyan-accent hover:bg-cyan-accent hover:text-midnight shadow-xl shadow-cyan-accent/20 z-40">
            <div className="relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-4 -right-4 bg-electric text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-midnight">
                  {itemCount}
                </span>
              )}
            </div>
          </Button>
        }
      />
      <SheetContent className="bg-midnight/95 backdrop-blur-2xl border-l border-white/10 text-white/80 light:bg-white light:border-black/10 light:text-black w-full sm:max-w-md transition-colors">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-display font-bold text-white light:text-black flex items-center gap-2 transition-colors">
            <ShoppingCart className="text-cyan-accent" />
            Your Supply Cart
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-white/40">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg overflow-hidden border border-white/10">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white light:text-black text-sm mb-1 transition-colors">{item.name}</h4>
                    <p className="text-cyan-accent font-bold text-sm mb-2">${item.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white/5 light:bg-black/5 rounded-md p-1 transition-colors">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-cyan-accent transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-cyan-accent transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-midnight/80 light:bg-white/90 backdrop-blur-md border-t border-white/10 light:border-black/10 transition-colors">
          <div className="flex justify-between mb-4">
            <span className="text-white/40 light:text-black">Subtotal</span>
            <span className="text-xl font-display font-bold text-white light:text-black transition-colors">${total.toLocaleString()}</span>
          </div>
          <Button 
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="w-full bg-electric hover:bg-cyan-accent hover:text-midnight h-12 font-bold text-lg"
          >
            <CreditCard className="mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
