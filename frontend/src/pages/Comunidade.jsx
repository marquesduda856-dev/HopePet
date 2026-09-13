import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Comunidade() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-purple-400/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Comunidade
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ninguém faz a diferença sozinho. Juntos formamos uma rede de apoio para ONGs, protetores e animais de rua.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Força em Grupo</h2>
            <p>
              A HOPE conecta quem quer ajudar com quem precisa de ajuda. Nossa comunidade engloba doadores, voluntários, lares temporários e organizações da sociedade civil.
            </p>
            <p>
              Veja no nosso mapa onde estão as necessidades mais urgentes perto de você e conecte-se com pessoas da sua região.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mapa" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-all shadow-md hover:shadow-lg gap-2">
                Acessar o Mapa da Comunidade <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
