import { createClient } from '@supabase/supabase-js';
import { SERVER_ENV } from '../config/server-env';

if (!SERVER_ENV.SUPABASE_URL || !SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  SERVER_ENV.SUPABASE_URL,
  SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
); 