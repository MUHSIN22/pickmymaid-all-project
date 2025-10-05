import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { deleteBlog, editBlog, getAllBlogs, getBlogById, submitBlog } from "./manageBlogAction"
import { IBlogDetials, IBlogRow, IBlogState } from "../../types/features/manageBlog.types"

const initialState: IBlogState = {
    status: 'idle',
    message: null,
    blogs: [],
    blogForEdit: null
}

export const manageBlogSlice = createSlice({
    name: 'manageBlog',
    initialState,
    reducers:{
        resetState: (state: IBlogState) => {
            state.status = 'idle'
            state.message = null
        },
        updateBlogs: (state: IBlogState, {payload} : PayloadAction<IBlogRow[]>) => {
            state.blogs = payload
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(submitBlog.pending, (state: IBlogState) => {
                state.status = 'loading'
            })
            .addCase(submitBlog.fulfilled, (state: IBlogState, {payload}: PayloadAction<string>) => {
                state.message = payload;
                state.status = 'success'
            })
            .addCase(submitBlog.rejected, (state: IBlogState, {payload}: PayloadAction<any>) => {
                state.message = payload.message;
                state.status = 'error'
            });
        
        builder
            .addCase(editBlog.pending, (state: IBlogState) => {
                state.status = 'loading'
            })
            .addCase(editBlog.fulfilled, (state: IBlogState, {payload}: PayloadAction<string>) => {
                state.message = payload;
                state.status = 'success'
            })
            .addCase(editBlog.rejected, (state: IBlogState, {payload}: PayloadAction<any>) => {
                state.message = payload.message;
                state.status = 'error'
            });

        builder
            .addCase(getAllBlogs.pending, (state: IBlogState) => {
                state.status = 'loading'
            })
            .addCase(getAllBlogs.fulfilled, (state: IBlogState, {payload}: PayloadAction<IBlogRow[]>) => {
                state.blogs = payload;
                state.status = 'success'
            })
            .addCase(getAllBlogs.rejected, (state: IBlogState, {payload}: PayloadAction<any>) => {
                state.message = payload.message;
                state.status = 'error'
            })

        builder
            .addCase(deleteBlog.pending, (state: IBlogState) => {
                state.status = 'loading'
            })
            .addCase(deleteBlog.fulfilled, (state: IBlogState, {payload}: PayloadAction<string>) => {
                state.message = payload;
                state.status = 'success'
            })
            .addCase(deleteBlog.rejected, (state: IBlogState, {payload}: PayloadAction<any>) => {
                state.message = payload.message;
                state.status = 'error'
            })

        builder
            .addCase(getBlogById.pending, (state: IBlogState) => {
                state.status = 'loading'
            })
            .addCase(getBlogById.fulfilled, (state: IBlogState, {payload}: PayloadAction<IBlogDetials>) => {
                state.blogForEdit = payload;
                state.status = 'success'
            })
            .addCase(getBlogById.rejected, (state: IBlogState, {payload}: PayloadAction<any>) => {
                state.message = payload.message;
                state.status = 'error'
            })
    }
})

export const {resetState, updateBlogs} = manageBlogSlice.actions;
export default manageBlogSlice.reducer;