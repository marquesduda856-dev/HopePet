import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Adocao() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#FA9198]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Heart className="h-8 w-8 text-[#FA9198]" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Adoção
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Dar um lar para um animal é um ato de amor que transforma duas vidas: a sua e a dele. Conectamos pessoas de bom coração a animais que precisam de uma segunda chance.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Por que adotar?</h2>
            <p>
              Ao adotar, você não está apenas salvando uma vida, mas também abrindo espaço nos abrigos para que outros animais possam ser resgatados. A adoção responsável é o principal pilar para reduzirmos o número de animais abandonados nas ruas.
            </p>
            <p>
              Na HOPE, facilitamos o encontro entre ONGs parceiras e futuros tutores, garantindo que o processo seja seguro, transparente e cheio de amor.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ongs" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#FA9198] hover:bg-[#F87C85] rounded-full transition-all shadow-md hover:shadow-lg gap-2">
                Encontrar ONGs parceiras <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
