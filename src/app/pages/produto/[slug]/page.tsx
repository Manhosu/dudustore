'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

// Dados de exemplo para o produto
const productData = {
  id: '1',
  name: 'Camiseta Oversized Premium',
  description: 'Camiseta premium com tecido de alta qualidade e conforto excepcional. Design moderno e corte oversized, perfeito para o dia a dia.',
  price: 89.90,
  originalPrice: 119.90,
  image: '/images/product-1.jpg',
  gallery: [
    '/images/product-1.jpg',
    '/images/product-1-alt-1.jpg',
    '/images/product-1-alt-2.jpg',
  ],
  sizes: ['P', 'M', 'G', 'GG'],
  colors: ['Preto', 'Branco', 'Cinza'],
  isNew: true,
  inStock: true,
};

// Cores disponíveis
const colorMap: Record<string, string> = {
  'Preto': 'bg-black',
  'Branco': 'bg-white border border-gray-300',
  'Cinza': 'bg-gray-500',
  'Azul': 'bg-blue-600',
  'Vermelho': 'bg-red-600',
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(productData.gallery[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const addItem = useCartStore((state) => state.addItem);

  // Funções para manipulação da quantidade
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Função para formatar preços
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Função para lidar com o zoom da imagem
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }
    
    if (!selectedColor) {
      toast.error('Por favor, selecione uma cor');
      return;
    }
    
    addItem({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    
    toast.success(`${productData.name} adicionado ao carrinho!`);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Galeria de imagens */}
          <div>
            {/* Imagem principal com zoom */}
            <div 
              className="relative aspect-square rounded-lg overflow-hidden mb-4 cursor-pointer"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <div 
                className="w-full h-full transition-all duration-200"
                style={{ 
                  transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
                }}
              >
                <Image
                  src={selectedImage}
                  alt={productData.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Miniaturas */}
            <div className="flex items-center space-x-2">
              {productData.gallery.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === image ? 'border-primary-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do produto */}
          <div>
            {/* Badges */}
            <div className="flex items-center space-x-2 mb-3">
              {productData.isNew && (
                <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
                  NOVO
                </span>
              )}
              {productData.originalPrice && productData.originalPrice > productData.price && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">{productData.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-900 mr-3">
                {formatPrice(productData.price)}
              </span>
              
              {productData.originalPrice && productData.originalPrice > productData.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8">{productData.description}</p>

            {/* Seleção de tamanho */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Tamanho:</h3>
              <div className="flex items-center space-x-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 min-w-10 px-3 rounded-md border font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de cor */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Cor:</h3>
              <div className="flex items-center space-x-3">
                {productData.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full ${colorMap[color]} transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-primary-600'
                        : 'ring-1 ring-offset-1 ring-gray-300 hover:ring-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Cor ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantidade e botão adicionar ao carrinho */}
            <div className="flex items-center flex-wrap space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow md:flex-grow-0 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Status do estoque */}
            <p className={`mt-4 text-sm ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {productData.inStock ? 'Em estoque' : 'Fora de estoque'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 