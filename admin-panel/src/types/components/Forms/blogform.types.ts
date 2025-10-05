export type IBlogForm = {
    thumbnail: File | string;
    title: string;
    description: string;
    content: string;
}

export type IBlogEditForm = {
    title: string;
    description: string;
    content: string;
    thumbnail?: string;
    thumbnailFile?: File;
}