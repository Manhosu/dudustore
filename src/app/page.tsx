'use client';

import HeroSection from "@/components/ui/HeroSection";
import CategorySection from "@/components/ui/CategorySection";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";

// Dados de exemplo para produtos em destaque
const featuredProducts = [
  {
    id: "1",
    name: "Camiseta Oversized Premium",
    price: 89.90,
    originalPrice: 119.90,
    image: "/images/product-1.jpg",
    slug: "camiseta-oversized-premium",
    isNew: true,
  },
  {
    id: "2",
    name: "Calça Cargo Streetwear",
    price: 159.90,
    image: "/images/product-2.jpg",
    slug: "calca-cargo-streetwear",
  },
  {
    id: "3",
    name: "Tênis Urban Style",
    price: 249.90,
    originalPrice: 299.90,
    image: "/images/product-3.jpg",
    slug: "tenis-urban-style",
    isSale: true,
  },
  {
    id: "4",
    name: "Boné Snapback Classic",
    price: 69.90,
    image: "/images/product-4.jpg",
    slug: "bone-snapback-classic",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      {/* Produtos em Destaque */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossos produtos mais populares e as novidades mais recentes da DUDU STORE.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/pages/categoria/todos" 
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Receba Ofertas Exclusivas
              </h2>
              <p className="text-gray-300 max-w-lg">
                Cadastre-se para receber as melhores ofertas e novidades da DUDU STORE diretamente no seu WhatsApp.
              </p>
            </div>
            <a 
              href="https://wa.me/5511999999999?text=Olá!%20Quero%20receber%20ofertas%20da%20DUDU%20STORE." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quero Receber Ofertas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
