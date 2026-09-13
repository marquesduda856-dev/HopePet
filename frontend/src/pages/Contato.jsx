import { useState } from 'react';
import { sendContato } from '../services/api';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendContato(formData);
      setSuccess(true);
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Fale com a HOPE</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer ser um parceiro? Mande uma mensagem para a nossa equipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
              <Mail className="h-10 w-10 text-[#FA9198] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>E-mail</h3>
              <p className="text-gray-600">contato@hope-platform.com</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
              <Phone className="h-10 w-10 text-[#FA9198] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Telefone</h3>
              <p className="text-gray-600">(11) 99999-9999</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center transition-transform hover:-translate-y-1">
              <MapPin className="h-10 w-10 text-[#FA9198] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Endereço</h3>
              <p className="text-gray-600">São Paulo, SP - Brasil</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem enviada!</h3>
                <p className="text-gray-600 mb-6">Recebemos seu contato e responderemos em breve.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-primary font-medium hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-1">Seu Nome *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Seu E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-sm font-bold text-gray-700 mb-1">Assunto *</label>
                  <input
                    type="text"
                    id="assunto"
                    name="assunto"
                    required
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-bold text-gray-700 mb-1">Mensagem *</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows="5"
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all resize-none bg-gray-50"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-[#FA9198] text-white px-8 py-4 rounded-full font-bold hover:bg-[#F87C85] transition-all shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}`}
                  >
                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
