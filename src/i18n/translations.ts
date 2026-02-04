export const translations = {
  ru: {
    title: 'Генератор Серверных ОС',
    subtitle: 'Бесплатное независимое автоматическое веб-приложение для создания и загрузки серверных операционных систем',
    selectOS: 'Выберите операционную систему',
    selectStorage: 'Выберите тип носителя',
    storageTypes: {
      hdd: 'HDD - Жёсткий диск',
      ssd: 'SSD - Твердотельный накопитель',
      sd: 'SD - Карта памяти',
      raw: 'RAW - Образ диска'
    },
    category: {
      all: 'Все категории',
      linux: 'Linux',
      bsd: 'BSD',
      windows: 'Windows'
    },
    download: 'Скачать',
    downloading: 'Загрузка...',
    version: 'Версия',
    kernel: 'Ядро',
    size: 'Размер',
    description: 'Описание',
    aiAssistant: 'ИИ Помощник',
    ftpAccess: 'FTP Доступ',
    archiver: 'ES-Архиватор',
    settings: 'Настройки',
    language: 'Язык',
    downloadHistory: 'История загрузок',
    noTemplates: 'Нет доступных шаблонов',
    searchPlaceholder: 'Поиск операционных систем...'
  },
  en: {
    title: 'Server OS Generator',
    subtitle: 'Free independent automatic web application for creating and downloading server operating systems',
    selectOS: 'Select Operating System',
    selectStorage: 'Select Storage Type',
    storageTypes: {
      hdd: 'HDD - Hard Disk Drive',
      ssd: 'SSD - Solid State Drive',
      sd: 'SD - Memory Card',
      raw: 'RAW - Disk Image'
    },
    category: {
      all: 'All Categories',
      linux: 'Linux',
      bsd: 'BSD',
      windows: 'Windows'
    },
    download: 'Download',
    downloading: 'Downloading...',
    version: 'Version',
    kernel: 'Kernel',
    size: 'Size',
    description: 'Description',
    aiAssistant: 'AI Assistant',
    ftpAccess: 'FTP Access',
    archiver: 'ES-Archiver',
    settings: 'Settings',
    language: 'Language',
    downloadHistory: 'Download History',
    noTemplates: 'No templates available',
    searchPlaceholder: 'Search operating systems...'
  },
  uk: {
    title: 'Генератор Серверних ОС',
    subtitle: 'Безкоштовний незалежний автоматичний веб-додаток для створення та завантаження серверних операційних систем',
    selectOS: 'Оберіть операційну систему',
    selectStorage: 'Оберіть тип носія',
    storageTypes: {
      hdd: 'HDD - Жорсткий диск',
      ssd: 'SSD - Твердотільний накопичувач',
      sd: 'SD - Карта пам\'яті',
      raw: 'RAW - Образ диска'
    },
    category: {
      all: 'Всі категорії',
      linux: 'Linux',
      bsd: 'BSD',
      windows: 'Windows'
    },
    download: 'Завантажити',
    downloading: 'Завантаження...',
    version: 'Версія',
    kernel: 'Ядро',
    size: 'Розмір',
    description: 'Опис',
    aiAssistant: 'ШІ Помічник',
    ftpAccess: 'FTP Доступ',
    archiver: 'ES-Архіватор',
    settings: 'Налаштування',
    language: 'Мова',
    downloadHistory: 'Історія завантажень',
    noTemplates: 'Немає доступних шаблонів',
    searchPlaceholder: 'Пошук операційних систем...'
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ru;
