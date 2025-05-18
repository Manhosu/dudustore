'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter } from 'lucide-react';
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

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filtra os produtos com base na categoria selecionada
  const filteredProducts = selectedCategory 
    ? allProducts.filter(product => product.category === selectedCategory)
    : allProducts;

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const categories = [
    { name: 'Todos', value: null },
    { name: 'Camisetas', value: 'camisetas' },
    { name: 'Calças', value: 'calcas' },
    { name: 'Tênis', value: 'tenis' },
    { name: 'Acessórios', value: 'acessorios' },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {selectedCategory ? `Categoria: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Todos os Produtos'}
          </h1>
          
          <button 
            className="md:hidden flex items-center gap-2 text-gray-700"
            onClick={toggleFilter}
          >
            <Filter size={18} />
            Filtrar
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros para Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`block w-full text-left py-2 px-3 rounded-md transition ${
                      (selectedCategory === category.value || (!selectedCategory && category.value === null))
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filtros para Mobile */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 bg-gray-800/50 z-40 flex justify-end">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="w-64 bg-white h-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-lg">Filtros</h3>
                  <button onClick={toggleFilter} className="text-gray-500">
                    &times;
                  </button>
                </div>
                
                <h4 className="font-medium mb-3">Categorias</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`block w-full text-left py-2 px-3 rounded-md transition ${
                        (selectedCategory === category.value || (!selectedCategory && category.value === null))
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setIsFilterOpen(false);
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Grade de produtos */}
          <div className="flex-grow">
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
      </div>
    </div>
  );
} 