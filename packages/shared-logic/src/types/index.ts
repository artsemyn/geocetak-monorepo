export interface User {
    id: string;
    email: string;
    name?: string;
    avatar_url?: string;
    role: 'student' | 'teacher' | 'admin';
  }
  
  export interface Module {
    id: string;
    name: string;
    description: string;
    order_index: number;
    is_active: boolean;
    created_at: string;
  }
  
  export interface Lesson {
    id: string;
    module_id: string;
    title: string;
    description: string;
    content_type: 'concept' | 'interactive' | 'quiz' | 'project';
    order_index: number;
    instructions?: string;
    video_url?: string;
    scene_config?: Record<string, any>;
    is_active: boolean;
    created_at: string;
  }
  
  export interface StudentProgress {
    id: string;
    user_id: string;
    lesson_id: string;
    completed_at?: string;
    score?: number;
    time_spent?: number;
    xp_earned: number;
    data?: Record<string, any>;
    created_at: string;
  }
  
  export interface Classroom {
    id: string;
    name: string;
    description?: string;
    teacher_id: string;
    invite_code: string;
    is_active: boolean;
    created_at: string;
  }
  
  export interface Assignment {
    id: string;
    classroom_id: string;
    lesson_id: string;
    title: string;
    description?: string;
    due_date?: string;
    created_at: string;
  }
  
  export interface ExportJob {
    id: string;
    user_id: string;
    source_model_path: string;
    output_file_path?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    error_message?: string;
    created_at: string;
    completed_at?: string;
  }