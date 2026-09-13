import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Conscientizacao() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-green-400/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Lightbulb className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Conscientização
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A educação é a chave para mudar a realidade dos animais. Compartilhar informação correta salva vidas e previne o abandono.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Educar para Transformar</h2>
            <p>
              Muitos casos de abandono ocorrem por falta de conhecimento sobre as responsabilidades de ter um animal. A conscientização foca em educar a sociedade sobre castração, cuidados e respeito à vida animal.
            </p>
            <p>
              Leia as histórias inspiradoras de resgates e como pequenas ações de pessoas comuns geraram grandes impactos.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/historias" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-500 hover:bg-green-600 rounded-full transition-all shadow-md hover:shadow-lg gap-2">
                Ler Histórias de Resgate <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
