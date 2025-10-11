export type IBlogState = {
  status: 'idle' | 'success' | 'error' | 'loading';
  message: null | string;
  blogs:  IBlogCard[];
  fetchedPage: number;
  blogForRead: null | IBlogDetails;
  totalPages: number;
};

export type IBlogCard = {
  blogID: string;
  thumbnail: string;
  title: string;
  description: string;
  editedDate: string;
};

export type IBlogDetails = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  content: string;
  editedAt: string;
  likes: number;
  isUserLiked: boolean;
  comments: IComment[];
};

export type IComment = {
  id: string;
  comment: string;
  userID: string;
  userName: string;
  createdAt: string;
};

export type ICommentBody = {
  comment: string;
  blog_id: string;
};
