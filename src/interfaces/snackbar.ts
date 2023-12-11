export interface SnackBarState {
  display: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
