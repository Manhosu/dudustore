'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Garantir que o componente só renderize no cliente
  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Função para formatar preços
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Cálculo do valor total do carrinho
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 0 : 0; // Frete grátis
  const total = subtotal + shipping;

  // Função para gerar a mensagem para o WhatsApp
  const generateWhatsAppMessage = () => {
    let message = 'Olá! Gostaria de fazer um pedido:\n\n';
    
    items.forEach(item => {
      message += `*${item.name}*\n`;
      message += `Quantidade: ${item.quantity}\n`;
      if (item.size) message += `Tamanho: ${item.size}\n`;
      if (item.color) message += `Cor: ${item.color}\n`;
      message += `Valor: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    message += `*Subtotal: ${formatPrice(subtotal)}*\n`;
    message += `*Total: ${formatPrice(total)}*\n\n`;
    message += 'Aguardo o contato para finalizar meu pedido!';
    
    return encodeURIComponent(message);
  };

  // URL para o WhatsApp
  const whatsappUrl = `https://wa.me/5511999999999?text=${generateWhatsAppMessage()}`;

  // Renderizar loader se não estiver montado ainda
  if (!mounted) {
    return null;
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          Meu Carrinho
        </h1>

        {isLoading ? (
          // Estado de carregamento
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : items.length === 0 ? (
          // Carrinho vazio
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 max-w-lg mx-auto"
          >
            <ShoppingCart size={64} className="mx-auto mb-6 text-gray-400" />
            <h2 className="text-2xl font-medium mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Explore nossa coleção e adicione produtos incríveis ao seu carrinho!
            </p>
            <Link 
              href="/" 
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              Continuar Comprando
            </Link>
          </motion.div>
        ) : (
          // Carrinho com itens
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de produtos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border-b border-gray-100 flex items-center"
                  >
                    {/* Imagem do produto */}
                    <div className="w-20 h-20 rounded-md overflow-hidden relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Detalhes do produto */}
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                        {item.size && <p>Tamanho: {item.size}</p>}
                        {item.color && <p>Cor: {item.color}</p>}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-200">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    {/* Botão remover */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                  <ArrowLeft size={16} className="mr-2" />
                  Continuar Comprando
                </Link>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors text-center"
                >
                  Finalizar pelo WhatsApp
                </a>
                
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Ao clicar em "Finalizar pelo WhatsApp", você será redirecionado para o WhatsApp 
                  para finalizar seu pedido diretamente conosco.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 