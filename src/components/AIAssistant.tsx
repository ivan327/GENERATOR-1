import { useState } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  t: any;
}

export const AIAssistant = ({ t }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я ваш ИИ-помощник на базе Gemini. Я помогу вам выбрать подходящую операционную систему для вашего сервера. Чем могу помочь?'
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: 'user', content: message }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Спасибо за ваш вопрос! Функция интеграции с Gemini AI готова к подключению. Вы можете добавить свой API ключ Gemini для полноценной работы ИИ-помощника.'
        }
      ]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
        title={t.aiAssistant}
      >
        <Bot className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200">
          <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-7 h-7" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t.aiAssistant}</h3>
                <p className="text-xs text-amber-100">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 text-slate-800 border border-amber-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Задайте вопрос..."
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Интеграция с Gemini AI готова к подключению
            </p>
          </div>
        </div>
      )}
    </>
  );
};
