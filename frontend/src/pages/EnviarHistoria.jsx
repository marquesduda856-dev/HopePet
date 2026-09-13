import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHistoria } from '../services/api';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnviarHistoria() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    titulo: '',
    historia: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createHistoria(formData);
      setSuccess(true);
      setTimeout(() => navigate('/historias'), 3000);
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua história. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-emerald-50 text-emerald-700 p-8 rounded-3xl max-w-md text-center border border-emerald-100">
          <h2 className="text-2xl font-bold mb-2">História enviada! 💛</h2>
          <p>Obrigado por compartilhar. Você será redirecionado em instantes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/historias" className="inline-flex items-center text-gray-500 hover:text-[#FA9198] mb-8 transition-colors font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para histórias
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Compartilhe sua história</h1>
          <p className="text-gray-600 mb-8 text-lg">Conte-nos sobre resgates, adoções e finais felizes.</p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-2">Seu Nome (opcional)</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="Como gostaria de ser chamado?"
                />
              </div>
              <div>
                <label htmlFor="cidade" className="block text-sm font-bold text-gray-700 mb-2">Cidade / Estado *</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>

            <div>
              <label htmlFor="titulo" className="block text-sm font-bold text-gray-700 mb-2">Título da História *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                placeholder="Um título curto e emocionante"
              />
            </div>

            <div>
              <label htmlFor="historia" className="block text-sm font-bold text-gray-700 mb-2">A História *</label>
              <textarea
                id="historia"
                name="historia"
                required
                rows="6"
                value={formData.historia}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all resize-none bg-gray-50"
                placeholder="Conte com detalhes como tudo aconteceu..."
              ></textarea>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#FA9198] text-white px-10 py-4 rounded-full font-bold hover:bg-[#F87C85] transition-all shadow-md w-full sm:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}`}
              >
                {loading ? 'Enviando...' : 'Enviar história'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
