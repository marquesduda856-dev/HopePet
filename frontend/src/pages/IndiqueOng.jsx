import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createSugestaoOng } from '../services/api';
import { ArrowLeft } from 'lucide-react';

export default function IndiqueOng() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_ong: '',
    cidade: '',
    estado: '',
    endereco: '',
    instagram: '',
    site: '',
    telefone: '',
    descricao: '',
    motivo: ''
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
      await createSugestaoOng(formData);
      setSuccess(true);
      setTimeout(() => navigate('/ongs'), 4000);
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua indicação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-emerald-50 text-emerald-700 p-8 rounded-3xl max-w-md text-center border border-emerald-100">
          <h2 className="text-2xl font-bold mb-2">Indicação enviada! 💛</h2>
          <p>Obrigado! Nossa equipe vai analisar e, se estiver tudo certo, ela logo aparecerá na HOPE.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/ongs" className="inline-flex items-center text-gray-500 hover:text-[#FA9198] font-bold mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para ONGs
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Conhece uma ONG incrível?</h1>
          <p className="text-gray-600 mb-10 text-lg">Ajude mais pessoas a encontrá-la e aumentar a rede de apoio aos animais.</p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="nome_ong" className="block text-sm font-bold text-gray-700 mb-2">Nome da ONG *</label>
                <input
                  type="text"
                  id="nome_ong"
                  name="nome_ong"
                  required
                  value={formData.nome_ong}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="Nome da instituição"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-bold text-gray-700 mb-2">Telefone (opcional)</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="cidade" className="block text-sm font-bold text-gray-700 mb-2">Cidade *</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="Ex: São Paulo"
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-bold text-gray-700 mb-2">Estado (UF) *</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  required
                  maxLength="2"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all uppercase bg-gray-50"
                  placeholder="SP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="instagram" className="block text-sm font-bold text-gray-700 mb-2">Instagram (opcional)</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="@nome_da_ong"
                />
              </div>
              <div>
                <label htmlFor="site" className="block text-sm font-bold text-gray-700 mb-2">Site (opcional)</label>
                <input
                  type="text"
                  id="site"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                  placeholder="www.exemplo.com.br"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-bold text-gray-700 mb-2">Breve descrição da ONG (opcional)</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all resize-none bg-gray-50"
                placeholder="Qual o foco do trabalho deles?"
              ></textarea>
            </div>

            <div>
              <label htmlFor="motivo" className="block text-sm font-bold text-gray-700 mb-2">Por que ela merece aparecer aqui? *</label>
              <textarea
                id="motivo"
                name="motivo"
                required
                rows="4"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all resize-none bg-gray-50"
                placeholder="Conte para a gente!"
              ></textarea>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#FA9198] text-white px-10 py-4 rounded-full font-bold hover:bg-[#F87C85] transition-all shadow-md w-full sm:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}`}
              >
                {loading ? 'Enviando...' : 'Enviar indicação'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
