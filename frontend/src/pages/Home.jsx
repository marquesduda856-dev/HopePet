import { Link } from 'react-router-dom';
import { MessageCircle, Heart, MapPin, Share2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pb-16 pt-20">
        {/* Banner Principal (Largura Total) */}
        <div className="w-full relative shadow-lg">
          <picture>
            <source media="(max-width: 768px)" srcSet="/banner-mobile.png" />
            <img 
              src="/banner.png" 
              alt="HOPE Banner Principal" 
              className="w-full h-auto sm:h-[75vh] lg:h-[85vh] sm:object-cover sm:object-center" 
              onError={(e) => { e.target.style.display='none'; }} 
            />
          </picture>
        </div>

        {/* Botões */}
        <div className="max-w-md sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 z-10">
            <Link to="/ongs" className="w-full sm:w-auto bg-[#FA9198] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#E87A82] transition-all shadow-lg hover:-translate-y-1 text-center flex items-center justify-center">
              Encontre Ajuda
            </Link>
            <a href="https://wa.me/5511989315092" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-[#FA9198] border-2 border-[#FA9198] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-1">
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Encontre Ajuda</h3>
              <p className="text-gray-600 mb-4">Localize abrigos, ONGs e clínicas veterinárias próximas a você em nosso mapa interativo.</p>
              <Link to="/mapa" className="text-primary font-medium hover:underline">Ver mapa &rarr;</Link>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Share2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Histórias que Inspiram</h3>
              <p className="text-gray-600 mb-4">Conheça resgates emocionantes e adoções que transformaram vidas, ou compartilhe a sua.</p>
              <Link to="/historias" className="text-primary font-medium hover:underline">Ler histórias &rarr;</Link>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apoie ONGs</h3>
              <p className="text-gray-600 mb-4">Conheça instituições sérias e descubra como você pode ajudar, ou indique uma ONG incrível.</p>
              <Link to="/ongs" className="text-primary font-medium hover:underline">Conhecer ONGs &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">Faça parte da HOPE</h2>
          <p className="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">
            Receba histórias inspiradoras, informações sobre proteção animal e novidades da nossa plataforma diretamente no seu e-mail.
          </p>
          
          <NewsletterForm />
        </div>
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>

    </div>
  );
}

// Componente isolado para o formulário para gerenciar estado próprio
import { useState } from 'react';
import { subscribeNewsletter } from '../services/api';
import { Mail } from 'lucide-react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setMessage('E-mail cadastrado com sucesso! Verifique sua caixa de entrada.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Ocorreu um erro ao cadastrar.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 inline-block">
        <p className="text-white font-medium text-lg">{message} 💛</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            className="w-full pl-12 pr-4 py-4 rounded-full border-none focus:ring-4 focus:ring-white/30 text-gray-900 text-lg outline-none shadow-lg"
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors whitespace-nowrap shadow-lg ${status === 'loading' ? 'opacity-70' : ''}`}
        >
          {status === 'loading' ? 'Enviando...' : 'Quero fazer parte'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-200 mt-4 font-medium bg-red-900/20 py-2 px-4 rounded-full inline-block">{message}</p>
      )}
    </form>
  );
}
