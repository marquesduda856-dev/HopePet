import { useState, useRef, useEffect } from 'react';
import { askHope } from '../services/api';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'hope',
      text: '🐈 Oi! Eu sou o Hope.\n\nPosso conversar com você sobre animais, adoção, cuidados, denúncias e também sobre o nosso projeto. Como posso ajudar hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    // Verifica se há uma mensagem inicial vinda da página "Encontrou um Animal"
    const initialMessage = sessionStorage.getItem('hopeInitialMessage');
    if (initialMessage) {
      sessionStorage.removeItem('hopeInitialMessage');
      
      const sendInitialMessage = async () => {
        const userMessage = { id: Date.now(), sender: 'user', text: initialMessage };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
          const res = await askHope(initialMessage);
          const hopeMessage = { id: Date.now() + 1, sender: 'hope', text: res.reply };
          setMessages(prev => [...prev, hopeMessage]);
        } catch (err) {
          const errorMessage = { id: Date.now() + 1, sender: 'hope', text: 'Desculpe, ocorreu um erro.' };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setLoading(false);
        }
      };
      sendInitialMessage();
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await askHope(userMessage.text);
      const hopeMessage = { id: Date.now() + 1, sender: 'hope', text: res.reply };
      setMessages(prev => [...prev, hopeMessage]);
    } catch (err) {
      const errorMessage = { id: Date.now() + 1, sender: 'hope', text: 'Desculpe, estou com problemas para me conectar no momento. Tente novamente mais tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const suggestions = [
    "Como cuidar de um gato?",
    "Encontrei um filhote na rua. O que faço?",
    "Como funciona a adoção?",
    "Quais cuidados um filhote precisa?"
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Pergunte ao Hope</h1>
          <p className="text-lg text-gray-600">Tem uma dúvida sobre animais? Nossa IA está pronta para ajudar.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
          {/* Header do Chat */}
          <div className="bg-primary px-6 py-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hope</h2>
              <p className="text-primary-100 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span> Online
              </p>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-grow p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-primary text-white'}`}>
                    {msg.sender === 'user' ? <User className="h-5 w-5 text-gray-500" /> : <Bot className="h-5 w-5" />}
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                  
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%] flex-row">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-primary text-white shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-gray-500 text-sm">Hope está digitando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugestões */}
          {messages.length < 3 && (
            <div className="px-6 py-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
              {suggestions.map((sug, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSuggestionClick(sug)}
                  className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva sua mensagem para o Hope..."
                className="w-full pl-6 pr-14 py-4 rounded-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition-colors ${(!input.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send className="h-5 w-5 ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
