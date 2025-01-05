import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://lvnoqoejuvxlhovdzzpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bm9xb2VqdXZ4bGhvdmR6enBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzODIzODUsImV4cCI6MjA1MDk1ODM4NX0.mffhKZgM9Szzdynn7dtGwh2ZFMbCw3dMzUcCMcng-eI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;