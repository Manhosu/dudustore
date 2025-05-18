'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Garantir que o componente só renderize no cliente
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white shadow-md py-3'
      : 'bg-black/80 py-4'
  }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const categories = [
    { name: 'Novidades', href: '/pages/categoria/novidades' },
    { name: 'Camisetas', href: '/pages/categoria/camisetas' },
    { name: 'Calças', href: '/pages/categoria/calcas' },
    { name: 'Tênis', href: '/pages/categoria/tenis' },
    { name: 'Acessórios', href: '/pages/categoria/acessorios' },
  ];

  // Renderizar uma versão simplificada até que o componente esteja montado
  if (!mounted) {
    return (
      <header className={headerClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative z-10">
              <div className="h-12 w-48 relative">
                <Image 
                  src={`/images/logo.png?v=${new Date().getTime()}`}
                  alt="DUDU STORE"
                  fill
                  sizes="(max-width: 768px) 120px, 160px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="h-12 w-48 relative">
              <Image 
                src={`/images/logo.png?v=${new Date().getTime()}`}
                alt="DUDU STORE"
                fill
                sizes="(max-width: 768px) 120px, 160px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="font-medium text-white hover:text-primary-400 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button aria-label="Buscar" className="text-white hover:text-primary-400 transition-colors">
              <Search size={20} />
            </button>
            <Link href="/perfil" className="text-white hover:text-primary-400 transition-colors">
              <User size={20} />
            </Link>
            <Link 
              href="/pages/carrinho" 
              className="text-white hover:text-primary-400 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none z-10"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-gray-900 z-40 pt-24 px-6"
        >
          <nav className="flex flex-col space-y-6 text-lg">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="font-medium text-white hover:text-primary-400 py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center space-x-8 pt-4">
              <Link 
                href="/perfil" 
                className="flex items-center space-x-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Minha Conta</span>
              </Link>
              <Link 
                href="/pages/carrinho" 
                className="flex items-center space-x-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <span>Carrinho ({cartItemCount})</span>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 