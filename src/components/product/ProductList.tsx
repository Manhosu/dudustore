import Link from 'next/link';
import Image from 'next/image';

// Tipagem para as props do componente
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
  category?: string;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  // Função para formatar preços
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/pages/produto/${product.slug}`}
          className="group block"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
                  NOVO
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1 transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
          
          <div className="flex items-center">
            <span className="font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 