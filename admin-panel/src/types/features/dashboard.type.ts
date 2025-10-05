export type IDashboardState = {
    error: boolean;
    loading: boolean;
    status: 'idle' | 'success' | 'error' | 'loading';
    message: string | null;
    categoryAnalytics: ICategoryAnalytics[]
}

export type ICategoryAnalytics = {
    category: string,
    count: number
}