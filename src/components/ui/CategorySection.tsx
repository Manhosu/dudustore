'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Camisetas',
    image: '/images/category-tshirts.jpg',
    slug: 'camisetas',
  },
  {
    id: '2',
    name: 'Calças',
    image: '/images/category-pants.jpg',
    slug: 'calcas',
  },
  {
    id: '3',
    name: 'Tênis',
    image: '/images/category-shoes.jpg',
    slug: 'tenis',
  },
  {
    id: '4',
    name: 'Acessórios',
    image: '/images/category-accessories.jpg',
    slug: 'acessorios',
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Navegue por Categoria
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção de produtos divididos por categorias e encontre exatamente o que você procura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                href={`/categoria/${category.slug}`}
                className="group block relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-colors" />
                  
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-medium mb-1">
                        {category.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-white text-sm">Ver produtos</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 