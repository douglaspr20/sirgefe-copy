export interface TrackerStatusResponse {
  data: {
    active: boolean;
  };
  error?: {
    code: number;
    message: string;
  };
  message: string;
}
