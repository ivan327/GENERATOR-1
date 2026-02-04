import { Globe, Settings } from 'lucide-react';
import { Language } from '../i18n/translations';

interface HeaderProps {
  t: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header = ({ t, language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-slate-300 text-sm max-w-2xl">{t.subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
              <Globe className="w-5 h-5" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm font-medium"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </select>
            </div>

            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
