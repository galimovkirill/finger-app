export interface Notification {
    id: string;
    type: 'success' | 'error';
    code?: number;
    title?: string;
    message?: string;
}
