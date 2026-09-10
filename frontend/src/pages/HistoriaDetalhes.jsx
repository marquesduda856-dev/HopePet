import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHistoriaById, getComentarios, createComentario } from '../services/api';
import { ArrowLeft, MapPin, User } from 'lucide-react';

export default function HistoriaDetalhes() {
  const { id } = useParams();
  const [historia, setHistoria] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form de comentários
  const [nome, setNome] = useState('');
  const [comentarioTexto, setComentarioTexto] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const histData = await getHistoriaById(id);
        setHistoria(histData);
        const comData = await getComentarios(id);
        setComentarios(comData);
      } catch (err) {
        setError('Não foi possível carregar a história.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !comentarioTexto.trim()) return;
    
    setEnviandoComentario(true);
    try {
      const novoComentario = await createComentario(id, { nome, comentario: comentarioTexto });
      setComentarios([...comentarios, novoComentario]);
      setNome('');
      setComentarioTexto('');
    } catch (err) {
      alert('Erro ao enviar comentário.');
    } finally {
      setEnviandoComentario(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !historia) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">{error || 'História não encontrada.'}</p>
        <Link to="/historias" className="text-primary hover:underline">Voltar para histórias</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/historias" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para histórias
        </Link>
        
        {/* História */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            {historia.cidade}
            <span className="mx-2">•</span>
            <User className="h-4 w-4 mr-1" />
            {historia.nome || 'Anônimo'}
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{historia.titulo}</h1>
          
          {historia.fotos && historia.fotos.length > 0 && (
            <img src={historia.fotos[0]} alt={historia.titulo} className="w-full h-auto rounded-2xl mb-8" />
          )}

          <div className="prose prose-lg text-gray-700 max-w-none whitespace-pre-wrap leading-relaxed">
            {historia.historia}
          </div>
        </article>

        {/* Seção de Comentários */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Comentários ({comentarios.length})</h3>
          
          {/* Formulário de Comentário */}
          <form onSubmit={handleComentarioSubmit} className="mb-10 bg-gray-50 p-6 rounded-2xl">
            <div className="mb-4">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
              <input
                type="text"
                id="nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Como quer ser chamado?"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">Comentário</label>
              <textarea
                id="comentario"
                required
                rows="3"
                value={comentarioTexto}
                onChange={(e) => setComentarioTexto(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Deixe uma mensagem amigável..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={enviandoComentario}
              className={`bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition-all ${enviandoComentario ? 'opacity-70' : ''}`}
            >
              {enviandoComentario ? 'Enviando...' : 'Enviar comentário'}
            </button>
          </form>

          {/* Lista de Comentários */}
          <div className="space-y-6">
            {comentarios.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum comentário ainda. Seja o primeiro!</p>
            ) : (
              comentarios.map(com => (
                <div key={com.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mr-3">
                      {com.nome.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{com.nome}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(com.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-13">{com.comentario}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
