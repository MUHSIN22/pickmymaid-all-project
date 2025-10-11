import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IBlogCard,
  IBlogDetails,
  IBlogState
} from '../../../types/features/blogs/blogs.types';
import { addComment, getBlogByID, getBlogs, likeBlog } from './blogsAction';

const initialState: IBlogState = {
  status: 'idle',
  message: null,
  blogs: [],
  fetchedPage: 0,
  blogForRead: null,
  totalPages: 0
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    resetState: (state: IBlogState) => {
      state.status = 'idle';
      state.message = null;
    },
    updateBlog: (
      state: IBlogState,
      { payload }: PayloadAction<IBlogDetails>
    ) => {
      state.blogForRead = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state: IBlogState) => {
        state.status = 'loading';
      })
      .addCase(
        getBlogs.fulfilled,
        (
          state: IBlogState,
          {
            payload
          }: PayloadAction<{
            data: IBlogCard[];
            totalBlogsCount: number;
            page: number;
          }>
        ) => {
          state.status = 'success';
          state.fetchedPage = payload.page;
          state.blogs = [...state.blogs, ...payload.data];
          state.totalPages = Math.ceil(payload.totalBlogsCount / 10);
        }
      )
      .addCase(
        getBlogs.rejected,
        (state: IBlogState, { payload }: PayloadAction<any>) => {
          state.message = payload.message;
          state.status = 'error';
        }
      );

    builder
      .addCase(getBlogByID.pending, (state: IBlogState) => {
        state.status = 'loading';
      })
      .addCase(
        getBlogByID.fulfilled,
        (state: IBlogState, { payload }: PayloadAction<IBlogDetails>) => {
          state.status = 'success';
          state.blogForRead = payload;
        }
      )
      .addCase(
        getBlogByID.rejected,
        (state: IBlogState, { payload }: PayloadAction<any>) => {
          state.message = payload.message;
          state.status = 'error';
        }
      );

    builder
      .addCase(addComment.pending, (state: IBlogState) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state: IBlogState) => {
        state.status = 'success';
        state.message = 'Comment added successfully!';
      })
      .addCase(
        addComment.rejected,
        (state: IBlogState, { payload }: PayloadAction<any>) => {
          state.message = payload?.message;
          state.status = 'error';
        }
      );

    builder
      .addCase(likeBlog.pending, (state: IBlogState) => {
        state.status = 'loading';
      })
      .addCase(likeBlog.fulfilled, (state: IBlogState) => {
        state.status = 'success';
      })
      .addCase(
        likeBlog.rejected,
        (state: IBlogState, { payload }: PayloadAction<any>) => {
          state.message = payload?.message;
          state.status = 'error';
        }
      );
  }
});

export const { resetState, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
