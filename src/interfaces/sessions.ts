import { ErrorResponse } from './error';

export interface UserSessions {
  sessions: UserSession[];
  error?: ErrorResponse;
}

export interface UserSession {
  browser_name: string;
  browser_version: string;
  created_at: string;
  ip: string;
  location: string;
  os_name: string;
  os_version: string;
}
