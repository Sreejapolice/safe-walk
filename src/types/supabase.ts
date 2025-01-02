export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          emergency_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          emergency_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          emergency_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      smartwatch_data: {
        Row: {
          id: string;
          user_id: string;
          heart_rate: number | null;
          steps: number;
          battery_level: number | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          heart_rate?: number | null;
          steps?: number;
          battery_level?: number | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          heart_rate?: number | null;
          steps?: number;
          battery_level?: number | null;
          timestamp?: string;
        };
      };
      // ... existing table definitions ...
    };
  };
}