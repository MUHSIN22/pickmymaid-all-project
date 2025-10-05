import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { IBlogEditForm, IBlogForm } from "../../types/components/Forms/blogform.types";
import { jsonToFormData } from "../../pages/ManageMaids/utils/JsontoformData";
import { IBlogDetials, IBlogRow } from "../../types/features/manageBlog.types";
import { imageUrl } from "../../app/config/imageUrl";

export const submitBlog = createAsyncThunk<
    string,
    IBlogForm
>('manage-blog/submit-blog', async(body, {rejectWithValue}) => {
    try{
        const {data:{message}} = await axiosInstance.post('blog',jsonToFormData(body),{
            headers: {
                'Content-Type': 'multipart/formdata'
            }
        });
        return message as string;
    }catch(error:any){
        return rejectWithValue({
            message: error.message
        })
    }
})

export const editBlog = createAsyncThunk<
    string,
    {data: IBlogEditForm , id: string}
>('manage-blog/edit-blog', async(req, {rejectWithValue}) => {
    try{
        const {data:{message}} = await axiosInstance.put(`blog/edit/${req.id}`,jsonToFormData(req.data),{
            headers: {
                'Content-Type': 'multipart/formdata'
            }
        });
        return message as string;
    }catch(error:any){
        return rejectWithValue({
            message: error.message
        })
    }
})

export const getAllBlogs = createAsyncThunk('manage-blog/get-blogs', async (_,{rejectWithValue}) => {
    try{
         const {data:{data: {blogs}}} = await axiosInstance('blog/blogs-admin');
        const returnFormat: IBlogRow[] = blogs?.map((blog: any) => ({
            id: blog.slug,
            thumbnail: `${imageUrl}${blog.thumbnail}`,
            title: blog.title,
            editedAt: blog.editedAt
        }))
         return returnFormat as IBlogRow[]
    }catch(error:any){
        return rejectWithValue({
            message: error.message
        })
    }
})

export const deleteBlog = createAsyncThunk<
    string,
    {id: string}
>('manage-blog/delete-blogs', async (req, {rejectWithValue}) => {
    try{
        const {data:{message}} = await axiosInstance.delete(`blog/${req.id}`);
        return message
    }catch(error:any){
        return rejectWithValue({
            message: error.message
        })
    }
})

export const getBlogById = createAsyncThunk<
    IBlogDetials,
    {id: string}
>('manage-blog/get-blog-by-id', async (req, {rejectWithValue}) => {
    try{
        const {data:{data:{blog}}} = await axiosInstance.get(`blog/id/${req.id}`);
        const returnFormat: IBlogDetials = {
            id: blog.slug,
            title: blog.title,
            thumbnail: blog.thumbnail,
            description: blog.description,
            content: blog.content
        }
        return returnFormat as IBlogDetials
    }catch(error:any){
        return rejectWithValue({
            message: error.response.data.message
        })
    }
})