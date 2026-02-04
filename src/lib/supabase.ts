import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface OSTemplate {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  kernel_version: string;
  download_size: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DownloadHistory {
  id?: string;
  template_id: string;
  user_ip: string;
  storage_type: string;
  download_status: string;
  created_at?: string;
  completed_at?: string;
}
