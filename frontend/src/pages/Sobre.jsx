import { Heart, ShieldCheck, Users } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Sobre a HOPE</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Acreditamos que toda vida merece uma chance. Nossa missão é conectar quem quer ajudar com quem precisa de ajuda.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Nossa História</h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              A HOPE nasceu do desejo de criar um ambiente digital acolhedor e informativo para a causa animal. 
              Sabemos que existem milhares de ONGs e protetores independentes fazendo um trabalho incrível, 
              mas muitas vezes eles não têm a visibilidade necessária para conseguir adoções ou recursos.
            </p>
            <p className="mt-4">
              Por outro lado, muitas pessoas amam animais e querem ajudar, adotar ou buscar orientação, 
              mas não sabem por onde começar. A HOPE é a ponte entre essas duas pontas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
            <Heart className="h-12 w-12 text-[#FA9198] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Acolhimento</h3>
            <p className="text-gray-600">Um espaço seguro para compartilhar histórias de finais felizes e inspirar mais pessoas a adotarem.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
            <ShieldCheck className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Proteção</h3>
            <p className="text-gray-600">Dar visibilidade a ONGs sérias e orientar pessoas sobre o que fazer ao encontrar um animal em risco.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
            <Users className="h-12 w-12 text-[#FFCE34] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Comunidade</h3>
            <p className="text-gray-600">Criar uma rede de apoio mútuo onde dúvidas são respondidas e o bem-estar animal é a prioridade.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
