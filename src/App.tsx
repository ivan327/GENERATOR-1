import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Header } from './components/Header';
import { OSCard } from './components/OSCard';
import { DownloadModal } from './components/DownloadModal';
import { AIAssistant } from './components/AIAssistant';
import { useLanguage } from './hooks/useLanguage';
import { supabase, OSTemplate } from './lib/supabase';

function App() {
  const { language, changeLanguage, t } = useLanguage();
  const [templates, setTemplates] = useState<OSTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<OSTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<OSTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchQuery, selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('os_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.version.toLowerCase().includes(query)
      );
    }

    setFilteredTemplates(filtered);
  };

  const handleDownload = (template: OSTemplate) => {
    setSelectedTemplate(template);
  };

  const handleConfirmDownload = async (storageType: string, useFTP: boolean, useArchive: boolean) => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('download_history')
        .insert({
          template_id: selectedTemplate.id,
          user_ip: 'anonymous',
          storage_type: storageType,
          download_status: 'completed',
          completed_at: new Date().toISOString()
        });

      if (error) throw error;

      const downloadInfo = {
        os: selectedTemplate.name,
        version: selectedTemplate.version,
        storage: storageType,
        ftp: useFTP,
        archive: useArchive,
        size: selectedTemplate.download_size
      };

      const blob = new Blob([JSON.stringify(downloadInfo, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTemplate.name.replace(/\s+/g, '-')}-${storageType}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSelectedTemplate(null);
    } catch (error) {
      console.error('Error recording download:', error);
    }
  };

  const categories = [
    { value: 'all', label: t.category.all },
    { value: 'linux', label: t.category.linux },
    { value: 'bsd', label: t.category.bsd },
    { value: 'windows', label: t.category.windows }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <Header t={t} language={language} onLanguageChange={changeLanguage} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-400 focus:outline-none transition-colors bg-white shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-slate-200 px-4 shadow-sm">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-3 pr-8 bg-transparent border-none outline-none cursor-pointer font-medium text-slate-700"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'результат' : 'результатов'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-700"></div>
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <OSCard
                key={template.id}
                template={template}
                t={t}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-xl text-slate-600 font-medium">{t.noTemplates}</p>
          </div>
        )}
      </main>

      <DownloadModal
        template={selectedTemplate}
        t={t}
        onClose={() => setSelectedTemplate(null)}
        onConfirmDownload={handleConfirmDownload}
      />

      <AIAssistant t={t} />

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 {t.title} • Бесплатное независимое приложение
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
