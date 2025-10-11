import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import { IBlogCard, IBlogDetails, ICommentBody } from "../../../types/features/blogs/blogs.types";

export const getBlogs = createAsyncThunk<
  {
    data: IBlogCard[];
    totalBlogsCount: number;
    page: number;
  },
  { page: number }
>("blogs/get-blogs", async (req, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(`/blog/page/${req.page}`);
    const returnFormat: IBlogCard[] = data?.blogs?.map((blog: any) => ({
      blogID: blog.slug,
      thumbnail: blog.thumbnail,
      title: blog.title,
      description: blog.description,
      editedDate: blog.editedDate,
    }));
    return {
      data: returnFormat,
      totalBlogsCount: data.total_counts,
      page: req.page,
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error?.data?.message,
    });
  }
});

export const getBlogByID = createAsyncThunk<IBlogDetails, { blogID: string }>("blogs/get-blog-by-id", async (req, { rejectWithValue }) => {
  try {
    const {
      data: {
        data: { blog },
      },
    } = await axiosInstance.get(`blog/id/${req.blogID}`);
    const returnFormat: IBlogDetails = {
      ...blog,
      comments: blog.comments?.map((comment: any) => ({
        userID: comment.user_id,
        userName: comment.user_name,
        comment: comment.comment,
        createdAt: comment.createdAt,
        id: comment._id,
      })),
    };
    return returnFormat as IBlogDetails;
  } catch (error: any) {
    return rejectWithValue({
      message: error.data.message,
    });
  }
});

export const addComment = createAsyncThunk<
  {
    message: string;
    data: ICommentBody;
  },
  { body: ICommentBody }
>("blogs/add-comment", async (req, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put("blog/comment", req.body);
    return {
      message: data?.message,
      data: data?.data,
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error.data.message,
    });
  }
});

export const likeBlog = createAsyncThunk<string, { slug: string }>("blogs/like-the-blog", async (req, { rejectWithValue }) => {
  try {
    await axiosInstance.put("blog/like", { slug: req.slug });
    return "Like updated!";
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});
