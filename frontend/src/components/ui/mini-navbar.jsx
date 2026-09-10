import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle, PawPrint } from 'lucide-react';

const AnimatedNavLink = ({ href, children }) => {
  const defaultTextColor = 'text-gray-600';
  const hoverTextColor = 'text-[#FA9198]';
  const textSizeClass = 'text-sm font-medium';

  return (
    <Link to={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </Link>
  );
};

export function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-[#FA9198] text-white p-1.5 rounded-full flex items-center justify-center shadow-sm">
        <PawPrint className="h-5 w-5" fill="currentColor" />
      </div>
      <span className="font-black text-xl text-gray-900 tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>HOPE</span>
    </Link>
  );

  const navLinksData = [
    { label: 'Início', href: '/' },
    { label: 'Histórias', href: '/historias' },
    { label: 'ONGs', href: '/ongs' },
    { label: 'Mapa', href: '/mapa' },
  ];

  const askHopeButtonElement = (
    <div className="relative group w-full sm:w-auto">
       <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-[#FA9198] opacity-20 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-40 group-hover:blur-xl group-hover:-m-3"></div>
       <Link to="/pergunte-ao-hope" className="relative z-10 px-4 py-2 sm:px-4 text-xs sm:text-sm font-bold text-[#FA9198] bg-white border-2 border-[#FA9198] rounded-full hover:bg-pink-50 transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2">
         <MessageCircle className="w-4 h-4" />
         Falar com o Hope
       </Link>
    </div>
  );

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       px-4 py-3 
                       ${headerShapeClass}
                       backdrop-blur-xl bg-white/40 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]
                       w-[calc(100%-2rem)] max-w-4xl sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-12">
        <div className="flex items-center">
           {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {askHopeButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-600 hover:text-[#FA9198] focus:outline-none transition-colors" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[500px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <Link key={link.href} to={link.href} className="text-gray-600 hover:text-[#FA9198] font-medium transition-colors w-full text-center py-2" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center w-full mt-6">
          {askHopeButtonElement}
        </div>
      </div>
    </header>
  );
}
