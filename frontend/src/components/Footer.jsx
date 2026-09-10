import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">HOPE</span>
            </Link>
            <p className="text-gray-500 mb-6 max-w-sm">
              Plataforma de proteção e conscientização animal. Informação, histórias e pessoas que acreditam que podemos fazer a diferença.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link to="/historias" className="text-gray-500 hover:text-primary transition-colors">Histórias</Link></li>
              <li><Link to="/ongs" className="text-gray-500 hover:text-primary transition-colors">ONGs</Link></li>
              <li><Link to="/mapa" className="text-gray-500 hover:text-primary transition-colors">Mapa</Link></li>
              <li><Link to="/pergunte-ao-hope" className="text-gray-500 hover:text-primary transition-colors">Pergunte ao Hope</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacidade" className="text-gray-500 hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="text-gray-500 hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="text-gray-500 hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Projeto HOPE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
