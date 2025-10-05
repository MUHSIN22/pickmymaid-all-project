export type IBlogState = {
    status: 'idle' | 'success' | 'error' | 'loading';
    message: string | null;
    blogs: IBlogRow[],
    blogForEdit: IBlogDetials | null;
}

export type IBlogRow = {
    id: string;
    thumbnail: string;
    title: string;
    editedAt: string;
}

export type IBlogDetials = {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
    content: string;
}