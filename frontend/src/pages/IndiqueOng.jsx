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
        <Link to="/ongs" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para ONGs
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conhece uma ONG incrível?</h1>
          <p className="text-gray-600 mb-8">Ajude mais pessoas a encontrá-la e aumentar a rede de apoio aos animais.</p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome_ong" className="block text-sm font-medium text-gray-700 mb-1">Nome da ONG *</label>
                <input
                  type="text"
                  id="nome_ong"
                  name="nome_ong"
                  required
                  value={formData.nome_ong}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Nome da instituição"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone (opcional)</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Ex: São Paulo"
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado (UF) *</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  required
                  maxLength="2"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all uppercase"
                  placeholder="SP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram (opcional)</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="@nome_da_ong"
                />
              </div>
              <div>
                <label htmlFor="site" className="block text-sm font-medium text-gray-700 mb-1">Site (opcional)</label>
                <input
                  type="text"
                  id="site"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="www.exemplo.com.br"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Breve descrição da ONG (opcional)</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="3"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Qual o foco do trabalho deles?"
              ></textarea>
            </div>

            <div>
              <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-1">Por que ela merece aparecer aqui? *</label>
              <textarea
                id="motivo"
                name="motivo"
                required
                rows="3"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Conte para a gente!"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
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
