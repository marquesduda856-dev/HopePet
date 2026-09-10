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
    
    // Opcional: poderíamos passar o estado via state do router
    // navigate('/pergunte-ao-hope', { state: { initialMessage: mensagemParaHope } });
    
    // Para simplificar e garantir que o chatbot pegue a primeira mensagem se formos usar um param na URL, ou podemos salvar no sessionStorage
    sessionStorage.setItem('hopeInitialMessage', mensagemParaHope);
    navigate('/pergunte-ao-hope');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Encontrou um animal?</h1>
          <p className="text-lg text-gray-600">
            Conte o que está acontecendo e o <span className="font-bold text-primary">Hope</span> (nossa inteligência artificial) ajudará você a entender os próximos passos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 mb-8">
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-8 flex gap-3">
            <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Importante:</strong> Esta ferramenta fornece orientações gerais. Se o animal estiver em situação de emergência, sangrando gravemente ou correndo risco de vida imediato, <strong>procure a clínica veterinária mais próxima ou as autoridades locais imediatamente</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">É um cachorro ou gato?</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                  <option value="nao_sei">Não sei identificar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qual a situação aparente?</label>
                <select
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="perdido">Parece perdido (bem cuidado, mas desorientado)</option>
                  <option value="abandonado">Parece abandonado (magro, assustado)</option>
                  <option value="atropelado">Foi atropelado / acidente</option>
                  <option value="maus_tratos">Vítima de maus-tratos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">O animal está visivelmente machucado?</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="machucado"
                    value="sim"
                    checked={formData.machucado === 'sim'}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="machucado"
                    value="nao"
                    checked={formData.machucado === 'nao'}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Não</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="machucado"
                    value="nao_sei"
                    checked={formData.machucado === 'nao_sei'}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Não tenho certeza</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descreva mais detalhes (opcional)</label>
              <textarea
                name="descricao"
                rows="3"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Qual o porte? Qual a cor? Ele está agressivo ou dócil?"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
