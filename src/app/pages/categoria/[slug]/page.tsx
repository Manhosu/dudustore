'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

// Dados de exemplo para produtos
const allProducts = [
  {
    id: "1",
    name: "Camiseta Oversized Premium",
    price: 89.90,
    originalPrice: 119.90,
    image: "/images/product-1.jpg",
    slug: "camiseta-oversized-premium",
    isNew: true,
    category: "camisetas"
  },
  {
    id: "2",
    name: "Calça Cargo Streetwear",
    price: 159.90,
    image: "/images/product-2.jpg",
    slug: "calca-cargo-streetwear",
    category: "calcas"
  },
  {
    id: "3",
    name: "Tênis Urban Style",
    price: 249.90,
    originalPrice: 299.90,
    image: "/images/product-3.jpg",
    slug: "tenis-urban-style",
    isSale: true,
    category: "tenis"
  },
  {
    id: "4",
    name: "Boné Snapback Classic",
    price: 69.90,
    image: "/images/product-4.jpg",
    slug: "bone-snapback-classic",
    category: "acessorios"
  },
  // Adicionando mais produtos para ter uma página com mais itens
  {
    id: "5",
    name: "Camiseta Estampada Graphic",
    price: 79.90,
    image: "/images/product-1.jpg", // Reutilizando imagem para exemplo
    slug: "camiseta-estampada-graphic",
    category: "camisetas"
  },
  {
    id: "6",
    name: "Calça Jeans Premium",
    price: 179.90,
    originalPrice: 219.90,
    image: "/images/product-2.jpg", // Reutilizando imagem para exemplo
    slug: "calca-jeans-premium",
    isSale: true,
    category: "calcas"
  },
  {
    id: "7",
    name: "Tênis Runners Pro",
    price: 299.90,
    image: "/images/product-3.jpg", // Reutilizando imagem para exemplo
    slug: "tenis-runners-pro",
    category: "tenis"
  },
  {
    id: "8",
    name: "Corrente Prata Urban",
    price: 129.90,
    image: "/images/product-4.jpg", // Reutilizando imagem para exemplo
    slug: "corrente-prata-urban",
    isNew: true,
    category: "acessorios"
  },
];

const categoryMap: Record<string, string> = {
  "camisetas": "Camisetas",
  "calcas": "Calças",
  "tenis": "Tênis",
  "acessorios": "Acessórios",
  "novidades": "Novidades"
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let filteredProducts = allProducts;
  
  // Se for uma categoria específica, filtra os produtos
  if (slug !== 'todos') {
    if (slug === 'novidades') {
      // Para novidades, mostra produtos com a tag "isNew"
      filteredProducts = allProducts.filter(product => product.isNew);
    } else {
      // Para outras categorias, filtra por categoria
      filteredProducts = allProducts.filter(product => product.category === slug);
    }
  }

  const categoryTitle = categoryMap[slug] || 'Todos os Produtos';

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {categoryTitle}
          </h1>
        </div>

        {/* Grade de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 