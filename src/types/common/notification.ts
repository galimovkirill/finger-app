export interface Notification {
    id: string;
    type: 'success' | 'error';
    code?: number;
    message?: string;
}
