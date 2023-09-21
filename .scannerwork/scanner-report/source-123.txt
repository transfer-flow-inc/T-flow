export interface FlashMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'null';
  duration: number;
}
