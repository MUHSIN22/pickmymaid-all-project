export type IUtilState = {
    status: 'idle' | 'success' | 'error' | 'loading';
    message: string | null;
    searchQuery: string;
}