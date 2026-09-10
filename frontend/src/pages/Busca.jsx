import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { globalSearch } from '../services/api';
import { Search, MapPin } from 'lucide-react';

export default function Busca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [resultados, setResultados] = useState({ historias: [], ongs: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await globalSearch(query);
        setResultados(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Resultados da busca por "{query}"
        </h1>
        <p className="text-gray-600 mb-8">
          Encontramos {resultados.historias.length + resultados.ongs.length} resultado(s).
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ONGs */}
            {resultados.ongs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">ONGs</h2>
                <div className="space-y-4">
                  {resultados.ongs.map(ong => (
                    <Link to="/ongs" key={ong.id} className="block bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-primary mb-1">{ong.nome}</h3>
                      <p className="text-sm text-gray-500 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {ong.cidade} - {ong.estado}
                      </p>
                      <p className="text-gray-700 line-clamp-2">{ong.descricao}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Histórias */}
            {resultados.historias.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Histórias</h2>
                <div className="space-y-4">
                  {resultados.historias.map(historia => (
                    <Link to={`/historias/${historia.id}`} key={historia.id} className="block bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-primary mb-1">{historia.titulo}</h3>
                      <p className="text-sm text-gray-500 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {historia.cidade}
                      </p>
                      <p className="text-gray-700 line-clamp-2">{historia.historia}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {resultados.ongs.length === 0 && resultados.historias.length === 0 && (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{query}".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
