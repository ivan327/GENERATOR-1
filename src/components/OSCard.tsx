import { Download, HardDrive, Cpu } from 'lucide-react';
import { OSTemplate } from '../lib/supabase';

interface OSCardProps {
  template: OSTemplate;
  t: any;
  onDownload: (template: OSTemplate) => void;
}

export const OSCard = ({ template, t, onDownload }: OSCardProps) => {
  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'linux':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'bsd':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'windows':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                <HardDrive className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{template.name}</h3>
                <p className="text-sm text-slate-600">{t.version}: {template.version}</p>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(template.category)}`}>
            {template.category.toUpperCase()}
          </span>
        </div>

        <p className="text-slate-700 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Cpu className="w-4 h-4" />
            <span className="font-medium">{t.kernel}:</span>
            <span>{template.kernel_version}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <HardDrive className="w-4 h-4" />
            <span className="font-medium">{t.size}:</span>
            <span>{formatSize(template.download_size)}</span>
          </div>
        </div>

        <button
          onClick={() => onDownload(template)}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          {t.download}
        </button>
      </div>
    </div>
  );
};
