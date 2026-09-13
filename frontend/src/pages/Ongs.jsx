import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOngs } from '../services/api';
import { MapPin, Search, ExternalLink, Link2, Phone, Globe } from 'lucide-react';


export default function Ongs() {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buscaCidade, setBuscaCidade] = useState('');

  const loadOngs = async (cidade = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await getOngs(cidade);
      setOngs(data);
    } catch (err) {
      setError('Não foi possível carregar as ONGs no momento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOngs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadOngs(buscaCidade);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Conheça as ONGs</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">Instituições sérias que precisam do seu apoio para continuar salvando vidas.</p>
          </div>
          <Link to="/ongs/indique" className="bg-white text-[#FA9198] border-2 border-[#FA9198]/20 px-8 py-4 rounded-full font-bold hover:bg-[#FA9198]/10 transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md">
            Indique uma ONG
          </Link>
        </div>

        {/* Barra de Busca */}
        <form onSubmit={handleSearch} className="mb-12 relative max-w-2xl">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Buscar ONGs por cidade..."
              value={buscaCidade}
              onChange={(e) => setBuscaCidade(e.target.value)}
              className="w-full pl-16 pr-36 py-5 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-lg bg-white"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FA9198] text-white px-8 py-3 rounded-full font-bold hover:bg-[#F87C85] transition-all hover:shadow-md"
            >
              Buscar
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA9198]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        ) : ongs.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center">
            <p className="text-gray-500 text-lg mb-4">Nenhuma ONG encontrada com esses filtros.</p>
            <button onClick={() => { setBuscaCidade(''); loadOngs(); }} className="text-[#FA9198] font-bold hover:underline">
              Limpar busca e ver todas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongs.map(ong => (
              <div key={ong.id} className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full">
                {ong.imagem ? (
                  <img src={ong.imagem} alt={ong.nome} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-[#FA9198]/10 flex items-center justify-center text-[#FA9198]">
                    <span className="text-5xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>{ong.nome.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{ong.nome}</h3>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {ong.cidade} - {ong.estado}
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {ong.descricao}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-3 mt-auto">
                    {ong.instagram && (
                      <a href={`https://instagram.com/${ong.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gray-600 hover:text-pink-600 transition-colors">
                        <Link2 className="h-4 w-4 mr-1" /> Insta
                      </a>
                    )}
                    {ong.site && (
                      <a href={ong.site.startsWith('http') ? ong.site : `https://${ong.site}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                        <Globe className="h-4 w-4 mr-1" /> Site
                      </a>
                    )}
                    {ong.telefone && (
                      <a href={`tel:${ong.telefone}`} className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                        <Phone className="h-4 w-4 mr-1" /> {ong.telefone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
