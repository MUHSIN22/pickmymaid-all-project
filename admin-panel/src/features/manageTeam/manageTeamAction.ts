import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../app/axiosInstance";
import { IDeleteMemberReturn, ITeamMember } from "../../types/features/manageTeam.types";

export const getAllTeamMembers: any = createAsyncThunk('manage-team/get-team', async (_, { rejectWithValue }) => {
  try {
    let { data: { data: { team } } } = await axiosInstance.get('admin/team');
    const returnFormat: ITeamMember[] = team.map((teamMember: any) => ({
      userID: teamMember.user_id,
      name: teamMember.name,
      email: teamMember.email,
      role: teamMember.is_super_admin ? 'Super Admin' : 'Admin'
    }))
    return returnFormat as ITeamMember[]
  } catch (error: any) {
    console.log({ error });

    return rejectWithValue({
      message: error.response.data.message
    })
  }
})


export const deleteTeamMember = createAsyncThunk<
  IDeleteMemberReturn,
  { id: string }
>('manage-team/delete-member', async (req, { rejectWithValue }) => {
  try {
    let { data: { message } } = await axiosInstance.delete(`/admin/team-member/${req.id}`);
    return { message, id: req.id } as IDeleteMemberReturn;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message
    })
  }
})

export const updateRole = createAsyncThunk<
  IDeleteMemberReturn,
  { id: string }
>('manage-team/update-member', async (req, { rejectWithValue }) => {
  try {
    let { data: { message } } = await axiosInstance.patch(`/admin/team-member/${req.id}`);
    return { message, id: req.id } as IDeleteMemberReturn;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message
    })
  }
})

