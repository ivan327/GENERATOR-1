# Server OS Generator

A free, independent web application for creating, customizing, and downloading server operating system templates. Built with modern web technologies to provide a seamless user experience across multiple languages.

## Features

- **Multi-Language Support**: Interface available in Russian, English, and Ukrainian
- **Server OS Templates**: Browse and download templates for Linux, BSD, and Windows server distributions
- **Flexible Download Options**:
  - Multiple storage type configurations (HDD, SSD, SD Card, RAW image)
  - FTP access support
  - Archive compression options
- **Search and Filter**: Quickly find operating systems by name, version, or category
- **AI Assistant**: Integrated assistant for user guidance
- **Download History**: Track and manage downloaded templates
- **Beautiful Modern UI**: Clean, responsive design with smooth animations
- **Real-time Updates**: Fast, efficient template management with Supabase backend

## Technology Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5.4** - Lightning-fast build tool
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Open source Firebase alternative with PostgreSQL
- **Row Level Security (RLS)** - Enterprise-grade data protection

### Development Tools
- **ESLint** - Code quality linting
- **PostCSS** - CSS transformation
- **Autoprefixer** - Vendor prefix automation

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ivanm696/automated-server-os-builder.git
   cd automated-server-os-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Find these values in your Supabase project settings:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Navigate to Settings → API
   - Copy `Project URL` and `anon public` key

4. **Initialize the database**

   The application requires two tables in your Supabase database:

   - `os_templates` - Stores operating system template information
   - `download_history` - Tracks download activity

   Database schema will be created automatically on first use, or you can set up manually:

   ```sql
   -- OS Templates Table
   CREATE TABLE os_templates (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     description TEXT,
     version TEXT,
     kernel TEXT,
     category TEXT,
     download_size TEXT,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMP DEFAULT now()
   );

   -- Download History Table
   CREATE TABLE download_history (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     template_id uuid REFERENCES os_templates(id),
     user_ip TEXT,
     storage_type TEXT,
     download_status TEXT,
     completed_at TIMESTAMP,
     created_at TIMESTAMP DEFAULT now()
   );

   -- Enable Row Level Security
   ALTER TABLE os_templates ENABLE ROW LEVEL SECURITY;
   ALTER TABLE download_history ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Public read OS templates"
     ON os_templates FOR SELECT
     USING (is_active = true);

   CREATE POLICY "Anyone can log downloads"
     ON download_history FOR INSERT
     WITH CHECK (true);
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Browsing Operating Systems
1. Open the application
2. Browse available OS templates in the grid view
3. Use the search bar to find specific operating systems
4. Filter by category (Linux, BSD, Windows) using the filter dropdown

### Downloading an Operating System
1. Click the "Download" button on any OS template
2. In the modal, select:
   - **Storage Type**: Choose between HDD, SSD, SD Card, or RAW image format
   - **FTP Access**: Enable for FTP access to downloaded files
   - **Archive**: Compress the download as needed
3. Confirm to download a JSON configuration file
4. The download is recorded in your history

### Changing Language
- Use the language selector in the header (Russian, English, Ukrainian)
- Your preference is saved in local storage
- All content dynamically updates to the selected language

## Supported Operating Systems

The application supports templates for:
- **Linux**: Ubuntu, CentOS, Debian, and more
- **BSD**: FreeBSD and OpenBSD variants
- **Windows**: Server editions

Templates are managed in the Supabase database and can be added or updated through the admin interface.

## Languages Supported

- 🇷🇺 Russian (Русский)
- 🇬🇧 English
- 🇺🇦 Ukrainian (Українська)

## Available Scripts

### Development
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint code quality checks
npm run typecheck  # Check TypeScript types
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.tsx       # Navigation and language selector
│   ├── OSCard.tsx       # Operating system template card
│   ├── DownloadModal.tsx # Download configuration modal
│   └── AIAssistant.tsx  # AI assistant interface
├── hooks/               # Custom React hooks
│   └── useLanguage.ts   # Language management hook
├── i18n/               # Internationalization
│   └── translations.ts # Language translations
├── lib/                # Utilities and configurations
│   └── supabase.ts    # Supabase client setup
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Performance Optimizations

- Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Efficient template filtering with real-time search
- Lazy loading and code splitting with Vite
- Optimized images and icons
- Database queries with proper indexing

## Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Authentication Context**: User data isolation through Supabase auth
- **Input Validation**: Safe handling of user inputs
- **Environment Variable Protection**: Sensitive keys in `.env` file (not committed to git)
- **No Personal Data Collection**: IP addresses used only for analytics

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- Advanced OS customization options
- User accounts and personalized templates
- Real-time download progress tracking
- Additional language support
- REST API for programmatic access
- Docker image generation
- CI/CD pipeline for automated testing

## Troubleshooting

### Templates not loading
- Verify Supabase connection in `.env` file
- Check that `os_templates` table exists in database
- Ensure `is_active` field is set to `true` for templates

### Download not working
- Check browser console for errors (F12)
- Verify JSON file can be created in your browser
- Ensure local storage has available space

### Language not changing
- Clear browser cache and local storage
- Try using incognito/private mode
- Verify `useLanguage` hook is properly initialized

## License

This project is free and independent. See the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Submit a detailed bug report with:
  - Browser and OS information
  - Steps to reproduce the issue
  - Console error messages (if any)

## Author

**Ivan M** - [GitHub Profile](https://github.com/ivanm696)

## Acknowledgments

- Built with [Supabase](https://supabase.io) for backend
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)
- Bootstrapped with [Vite](https://vitejs.dev)

---

**Note**: This is a free, independent project created to provide accessible tools for server OS management. It is not affiliated with any operating system vendors.

Made with ❤️ for the developer community
