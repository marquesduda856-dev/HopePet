import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, HelpCircle } from 'lucide-react';

export default function EncontrouAnimal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: 'cachorro',
    situacao: 'perdido',
    machucado: 'nao',
    descricao: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Constrói a mensagem inicial para o Hope
    const mensagemParaHope = `Encontrei um animal. É um ${formData.tipo}. Situação: ${formData.situacao}. Ele está machucado? ${formData.machucado}. Mais detalhes: ${formData.descricao}. O que devo fazer?`;
    
    // Redireciona para o WhatsApp com a mensagem pré-preenchida
    const url = `https://wa.me/5511989315092?text=${encodeURIComponent(mensagemParaHope)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FA9198]/10 text-[#FA9198] rounded-full mb-6">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Encontrou um animal?</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Conte o que está acontecendo e o <span className="font-bold text-[#FA9198]">Hope</span> (nossa inteligência artificial) ajudará você a entender os próximos passos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 mb-8">
          
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl mb-10 flex gap-4 items-start">
            <HelpCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>Importante:</strong> Esta ferramenta fornece orientações gerais. Se o animal estiver em situação de emergência, sangrando gravemente ou correndo risco de vida imediato, <strong>procure a clínica veterinária mais próxima ou as autoridades locais imediatamente</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">É um cachorro ou gato?</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                  <option value="nao_sei">Não sei identificar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Qual a situação aparente?</label>
                <select
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all bg-gray-50"
                >
                  <option value="perdido">Parece perdido (bem cuidado, mas desorientado)</option>
                  <option value="abandonado">Parece abandonado (magro, assustado)</option>
                  <option value="atropelado">Foi atropelado / acidente</option>
                  <option value="maus_tratos">Vítima de maus-tratos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">O animal está visivelmente machucado?</label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="machucado"
                    value="sim"
                    checked={formData.machucado === 'sim'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#FA9198] focus:ring-[#FA9198] border-gray-300"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-[#FA9198] transition-colors">Sim</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="machucado"
                    value="nao"
                    checked={formData.machucado === 'nao'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#FA9198] focus:ring-[#FA9198] border-gray-300"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-[#FA9198] transition-colors">Não</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="machucado"
                    value="nao_sei"
                    checked={formData.machucado === 'nao_sei'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#FA9198] focus:ring-[#FA9198] border-gray-300"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-[#FA9198] transition-colors">Não tenho certeza</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Descreva mais detalhes (opcional)</label>
              <textarea
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-[#FA9198]/20 focus:border-[#FA9198] outline-none transition-all resize-none bg-gray-50"
                placeholder="Qual o porte? Qual a cor? Ele está agressivo ou dócil?"
              ></textarea>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-[#FA9198] text-white px-10 py-4 rounded-full font-bold hover:bg-[#F87C85] transition-all hover:-translate-y-1 hover:shadow-lg shadow-md w-full sm:w-auto"
              >
                Falar com o Hope
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
