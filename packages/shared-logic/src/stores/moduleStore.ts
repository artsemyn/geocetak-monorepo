import { create } from 'zustand';
import { Module, Lesson, StudentProgress } from '../types';
import { moduleService } from '../services/moduleService';
import { supabase } from '../lib/supabase';

interface ModuleState {
  modules: Module[];
  currentModule: Module | null;
  currentLessons: Lesson[];
  userProgress: StudentProgress[];
  loading: boolean;
  fetchModules: () => Promise<void>;
  setCurrentModule: (moduleId: string) => Promise<void>;
  getUserProgress: (userId: string) => Promise<void>;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  modules: [],
  currentModule: null,
  currentLessons: [],
  userProgress: [],
  loading: false,

  fetchModules: async () => {
    set({ loading: true });
    try {
      const modules = await moduleService.getAllModules();
      set({ modules });
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentModule: async (moduleId: string) => {
    set({ loading: true });
    try {
      const module = await moduleService.getModuleById(moduleId);
      const lessons = module ? await moduleService.getModuleLessons(moduleId) : [];
      set({ currentModule: module, currentLessons: lessons });
    } catch (error) {
      console.error('Error setting current module:', error);
    } finally {
      set({ loading: false });
    }
  },

  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('student_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user progress:', error);
    } else {
      set({ userProgress: data || [] });
    }
  }
}));