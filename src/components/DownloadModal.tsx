import { useState } from 'react';
import { X, Download, HardDrive, Server, CreditCard, FileImage, Archive, Wifi } from 'lucide-react';
import { OSTemplate } from '../lib/supabase';

interface DownloadModalProps {
  template: OSTemplate | null;
  t: any;
  onClose: () => void;
  onConfirmDownload: (storageType: string, useFTP: boolean, useArchive: boolean) => void;
}

export const DownloadModal = ({ template, t, onClose, onConfirmDownload }: DownloadModalProps) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('ssd');
  const [useFTP, setUseFTP] = useState(false);
  const [useArchive, setUseArchive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!template) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      onConfirmDownload(selectedStorage, useFTP, useArchive);
      setIsDownloading(false);
    }, 1500);
  };

  const storageOptions = [
    { value: 'hdd', label: t.storageTypes.hdd, icon: HardDrive, color: 'from-slate-600 to-slate-800' },
    { value: 'ssd', label: t.storageTypes.ssd, icon: Server, color: 'from-blue-600 to-blue-800' },
    { value: 'sd', label: t.storageTypes.sd, icon: CreditCard, color: 'from-emerald-600 to-emerald-800' },
    { value: 'raw', label: t.storageTypes.raw, icon: FileImage, color: 'from-orange-600 to-orange-800' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{template.name}</h2>
            <p className="text-slate-600 text-sm mt-1">{template.version} • {template.kernel_version}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t.selectStorage}</h3>
            <div className="grid grid-cols-2 gap-3">
              {storageOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStorage(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedStorage === option.value
                        ? 'border-slate-700 bg-slate-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 text-left">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Дополнительные опции</h3>

            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition-all bg-white">
              <input
                type="checkbox"
                checked={useFTP}
                onChange={(e) => setUseFTP(e.target.checked)}
                className="w-5 h-5 text-slate-700 rounded focus:ring-2 focus:ring-slate-500"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-medium text-slate-800">{t.ftpAccess}</span>
                  <p className="text-xs text-slate-600">Включить FTP-доступ для загрузки</p>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition-all bg-white">
              <input
                type="checkbox"
                checked={useArchive}
                onChange={(e) => setUseArchive(e.target.checked)}
                className="w-5 h-5 text-slate-700 rounded focus:ring-2 focus:ring-slate-500"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-medium text-slate-800">{t.archiver}</span>
                  <p className="text-xs text-slate-600">Сжать образ с помощью ES-архиватора</p>
                </div>
              </div>
            </label>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">{t.description}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{template.description}</p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? t.downloading : t.download}
          </button>
        </div>
      </div>
    </div>
  );
};
