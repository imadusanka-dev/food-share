
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rduleywraplqgftmkovd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdWxleXdyYXBscWdmdG1rb3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MTc3NzEsImV4cCI6MjAzMjI5Mzc3MX0.wIbhgYAUSvEhr4iJtQBhP5xSO_7PpPxtsJw3J3Cu1xg';
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})