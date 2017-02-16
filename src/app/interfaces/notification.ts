export interface Notification {
    title: string;
    text: string;
    type: string;
    pinned: boolean;
    lines?: string[];
}
