export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  emergency_contacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
}

export interface LocationUpdate {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  safety_score: number;
}