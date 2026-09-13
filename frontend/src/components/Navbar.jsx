import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-3 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-50 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="HOPE" className="h-10 w-10 object-contain rounded-full border-2 border-[#FA9198]" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span className="font-bold text-2xl text-gray-900 tracking-wider" style={{ fontFamily: 'var(--font-heading)', display: 'none' }}>HOPE</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base">Início</Link>
            <Link to="/historias" className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base">Histórias</Link>
            <Link to="/ongs" className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base">ONGs</Link>
            <Link to="/mapa" className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base">Mapa</Link>
            <Link to="/sobre" className="text-gray-600 hover:text-primary transition-colors text-sm lg:text-base">Sobre</Link>
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Pesquise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-1.5 rounded-full border border-gray-200 focus:outline-none focus:border-primary text-sm w-32 lg:w-48 transition-all focus:w-48 lg:focus:w-64"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <a href="https://wa.me/5511989315092" target="_blank" rel="noopener noreferrer" className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all text-sm">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">Falar no WhatsApp</span>
              <span className="lg:hidden">WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Início</Link>
          <Link to="/historias" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Histórias</Link>
          <Link to="/ongs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">ONGs</Link>
          <Link to="/mapa" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Mapa</Link>
          <Link to="/encontrou-animal" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Encontrou um animal?</Link>
          <a href="https://wa.me/5511989315092" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10 hover:bg-primary/20">Falar no WhatsApp</a>
        </div>
      )}
    </nav>
  );
}
