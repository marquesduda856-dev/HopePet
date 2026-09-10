import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getOngs } from '../services/api';
import { MapPin, Phone, Globe, Link2, ExternalLink } from 'lucide-react';

// Correção de ícone do Leaflet no Vite/React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Mapa() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Centro do Brasil por padrão
  const centroPadrao = [-14.235, -51.9253];

  useEffect(() => {
    async function loadMapData() {
      try {
        const data = await getOngs();
        // Filtrar apenas ONGs que possuem latitude e longitude válidas
        const ongsComCoordenadas = data.filter(ong => ong.latitude && ong.longitude);
        setLocais(ongsComCoordenadas);
      } catch (err) {
        setError('Não foi possível carregar as localizações.');
      } finally {
        setLoading(false);
      }
    }
    loadMapData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Encontre ajuda perto de você</h1>
          <p className="mt-2 text-lg text-gray-600">Explore o mapa para encontrar abrigos e ONGs na sua região.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8">
          {loading ? (
            <div className="flex justify-center items-center h-[500px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="h-[500px] w-full rounded-2xl overflow-hidden relative z-0 border border-gray-200">
              <MapContainer 
                center={centroPadrao} 
                zoom={4} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {locais.map((local) => (
                  <Marker 
                    key={local.id} 
                    position={[local.latitude, local.longitude]}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1 max-w-xs">
                        {local.imagem && (
                          <img src={local.imagem} alt={local.nome} className="w-full h-24 object-cover rounded-md mb-2" />
                        )}
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{local.nome}</h3>
                        <p className="text-xs text-gray-500 mb-2 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {local.cidade} - {local.estado}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {local.descricao}
                        </p>
                        
                        <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-100">
                          {local.telefone && (
                            <a href={`tel:${local.telefone}`} className="text-emerald-600 text-sm flex items-center hover:underline">
                              <Phone className="h-3 w-3 mr-1" /> {local.telefone}
                            </a>
                          )}
                          {local.site && (
                            <a href={local.site.startsWith('http') ? local.site : `https://${local.site}`} target="_blank" rel="noopener noreferrer" className="text-primary text-sm flex items-center hover:underline">
                              <Link2 className="h-3 w-3 mr-1" /> Visitar site
                            </a>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
