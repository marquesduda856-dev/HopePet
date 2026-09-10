import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistorias } from '../services/api';
import { MapPin, PlusCircle, ArrowRight } from 'lucide-react';

export default function Historias() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHistorias() {
      try {
        const data = await getHistorias();
        setHistorias(data);
      } catch (err) {
        setError('Não foi possível carregar as histórias no momento.');
      } finally {
        setLoading(false);
      }
    }
    loadHistorias();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Histórias que inspiram</h1>
            <p className="mt-2 text-lg text-gray-600">Resgates, adoções e finais felizes que nos dão esperança.</p>
          </div>
          <Link to="/historias/nova" className="mt-4 md:mt-0 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Compartilhar uma história
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : historias.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
            <p className="text-gray-500 text-lg mb-4">Ainda não temos histórias publicadas.</p>
            <p className="text-gray-400">Seja o primeiro a compartilhar um momento especial! 💛</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {historias.map(historia => (
              <div key={historia.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                {historia.fotos && historia.fotos.length > 0 ? (
                  <img src={historia.fotos[0]} alt={historia.titulo} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {historia.cidade}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{historia.titulo}</h3>
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {historia.historia}
                  </p>
                  <Link to={`/historias/${historia.id}`} className="text-primary font-semibold flex items-center hover:underline mt-auto">
                    Ler história <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
