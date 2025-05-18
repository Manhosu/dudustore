'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  slug,
  isNew = false,
  isSale = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
    
    toast.success(`${name} adicionado ao carrinho!`);
  };

  return (
    <motion.div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
            NOVO
          </span>
        )}
        {isSale && (
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            OFERTA
          </span>
        )}
      </div>

      {/* Imagem com zoom */}
      <Link href={`/produto/${slug}`} className="block relative aspect-square overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 ease-out relative"
          style={{ 
            transform: isHovered ? 'scale(1.1)' : 'scale(1.01)',
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </Link>

      {/* Informações do produto */}
      <div className="p-4">
        <Link href={`/produto/${slug}`}>
          <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center">
          <p className="font-semibold text-gray-900 mr-2">
            {formatPrice(price)}
          </p>
          
          {originalPrice && originalPrice > price && (
            <p className="text-gray-500 text-sm line-through">
              {formatPrice(originalPrice)}
            </p>
          )}
        </div>
      </div>

      {/* Botão flutuante para adicionar ao carrinho */}
      <div 
        className={`absolute bottom-4 right-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button 
          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full shadow-md"
          aria-label="Adicionar ao carrinho"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard; 