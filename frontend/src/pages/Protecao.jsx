import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Protecao() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-400/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Proteção
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combater os maus-tratos e o abandono é um dever de todos. Saiba como identificar, denunciar e proteger animais em situação de risco.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Como Proteger?</h2>
            <p>
              A proteção animal começa com a vigilância e a ação. Denunciar casos de abandono, violência ou negligência é o primeiro passo para resgatar vidas que não podem pedir socorro.
            </p>
            <p>
              Se você presenciou algo ou encontrou um animal precisando de ajuda urgente, não hesite em agir.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/encontrou-animal" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-all shadow-md hover:shadow-lg gap-2">
                Encontrou um animal? <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
