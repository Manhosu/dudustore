'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg" 
          alt="DUDU STORE"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Estilo que <span className="text-primary-400">transforma</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              Descubra a nova coleção exclusiva da DUDU STORE e renove seu estilo com peças únicas e de alta qualidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/categoria/novidades" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-colors text-center"
              >
                Comprar Agora
              </Link>
              
              <Link 
                href="/categoria/colecao" 
                className="inline-block bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-md transition-colors text-center"
              >
                Ver Coleção
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse", 
          repeatDelay: 0.5
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm font-medium mb-2">Rolar para baixo</span>
          <div className="w-0.5 h-6 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 