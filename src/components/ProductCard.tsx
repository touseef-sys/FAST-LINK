import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  key?: string;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card group overflow-hidden flex flex-col h-full light:bg-white light:shadow-lg light:border-black/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent light:from-white/50" />
        <Badge className="absolute top-4 left-4 bg-electric/80 backdrop-blur-md border-none">
          {product.category}
        </Badge>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-white light:text-black mb-2 group-hover:text-cyan-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-white/60 light:text-black text-sm mb-6 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-display font-bold text-white light:text-black">
            ${product.price.toLocaleString()}
          </span>
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-electric hover:bg-cyan-accent hover:text-midnight transition-all group/btn"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
          </Button>
        </div>
      </div>
      
      {/* Neon glow effect on hover */}
      <div className="absolute inset-0 border-2 border-cyan-accent/0 group-hover:border-cyan-accent/20 rounded-2xl transition-all pointer-events-none" />
    </motion.div>
  );
};
