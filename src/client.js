import { createClient } from '@supabase/supabase-js';

const URL = 'https://xsfxefchvivcrjzwtzha.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZnhlZmNodml2Y3Jqend0emhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTUzMjcsImV4cCI6MjA3MTI5MTMyN30.MPjPOoZk6KQOO6Ao8_25-FotmMFnb0b08kQ6Tp86oWc';

export const supabase = createClient(URL, API_KEY);