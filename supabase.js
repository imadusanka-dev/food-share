
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://vrmnutfpcidcszktfdzr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybW51dGZwY2lkY3N6a3RmZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTkwNzUsImV4cCI6MjA1ODQ5NTA3NX0.xjvFmeVHrEwq1NpkGWkz7_xusYRthBJCyiEU1w4Zsgs';
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})