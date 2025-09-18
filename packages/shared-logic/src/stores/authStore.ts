import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase'; // ✅ Benar

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  signUp: async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },

  initialize: async () => {
    set({ loading: true });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      set({
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: profile?.name,
          avatar_url: profile?.avatar_url,
          role: profile?.role || 'student',
        },
      });
    }
    
    set({ loading: false });
    
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: profile?.name,
            avatar_url: profile?.avatar_url,
            role: profile?.role || 'student',
          },
        });
      } else if (event === 'SIGNED_OUT') {
        set({ user: null });
      }
    });
  },
}));