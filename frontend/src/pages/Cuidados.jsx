import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cuidados() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#FFCE34]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
            <Activity className="h-8 w-8 text-[#FFCE34]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Cuidados
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A saúde e o bem-estar do seu animal são fundamentais. Aprenda sobre vacinação, alimentação e cuidados diários essenciais.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Bem-estar Animal</h2>
            <p>
              Garantir uma boa qualidade de vida para os animais exige dedicação e conhecimento. Desde a alimentação correta até as visitas regulares ao veterinário, cada detalhe importa.
            </p>
            <p>
              Se você tem dúvidas sobre como cuidar melhor do seu pet ou de um animal que acabou de resgatar, nosso assistente virtual está pronto para ajudar com orientações.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5511989315092" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-[#FFCE34] hover:bg-[#FDD043] rounded-full transition-all shadow-md hover:shadow-lg gap-2">
                Falar no WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
