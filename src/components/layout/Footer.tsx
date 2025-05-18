import Link from 'next/link';
import { Instagram, Facebook, Twitter, Smartphone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e informações */}
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold tracking-tight">
              DUDU <span className="text-primary-400">STORE</span>
            </h2>
            <p className="text-gray-400 max-w-xs">
              Moda exclusiva e de alta qualidade para todos os estilos e ocasiões.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/categoria/novidades" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/categoria/mais-vendidos" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Mais Vendidos
                </Link>
              </li>
              <li>
                <Link href="/categoria/promocoes" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Promoções
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Smartphone size={18} className="mr-2" />
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="text-gray-400">
                <a 
                  href="mailto:contato@dudustore.com" 
                  className="hover:text-primary-400 transition-colors"
                >
                  contato@dudustore.com
                </a>
              </li>
              <li className="text-gray-400 pt-2">
                Segunda a Sexta:<br />
                09:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} DUDU STORE. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 