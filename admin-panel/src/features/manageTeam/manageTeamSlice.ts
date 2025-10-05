import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDeleteMemberReturn, IManageTeamState, ITeamMember } from "../../types/features/manageTeam.types";
import { deleteTeamMember, getAllTeamMembers, updateRole } from "./manageTeamAction";

const initialState: IManageTeamState = {
  error: false,
  loading: false,
  message: null,
  status: 'idle',
  teamList: null
}

export const manageTeamSlice = createSlice({
  name: 'manageTeam',
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    addTeamMember: (state: IManageTeamState, { payload }: { payload: ITeamMember }) => {
      if (state.teamList) {
        state.teamList = [...state?.teamList, payload]
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeamMembers.fulfilled, (state: IManageTeamState, { payload }: { payload: ITeamMember[] }) => {
        state.error = false;
        state.status = 'success';
        state.loading = false;
        state.teamList = payload;
      })
      .addCase(getAllTeamMembers.pending, (state: IManageTeamState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getAllTeamMembers.rejected, (state: IManageTeamState) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
      })

    builder
      .addCase(deleteTeamMember.fulfilled, (state: IManageTeamState, { payload }: PayloadAction<IDeleteMemberReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
        state.teamList = state.teamList?.filter((member) => member.userID !== payload.id) || [];
      })
      .addCase(deleteTeamMember.pending, (state: IManageTeamState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(deleteTeamMember.rejected, (state: IManageTeamState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
        state.message = payload.message
      })

    builder
      .addCase(updateRole.fulfilled, (state: IManageTeamState, { payload }: PayloadAction<IDeleteMemberReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
        state.teamList = state.teamList ? state.teamList?.map(member => {
          if (member.userID === payload?.id) {
            return {
              ...member,
              role: member.role === 'Super Admin' ? 'Admin' : 'Super Admin'
            }
          } else {
            return member
          }
        }) : []
      })
      .addCase(updateRole.pending, (state: IManageTeamState) => {
        state.error = false;
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateRole.rejected, (state: IManageTeamState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.status = 'error';
        state.loading = false;
        state.message = payload.message
      })
  }
})

export const { addTeamMember, resetTeamState } = manageTeamSlice.actions;
export default manageTeamSlice.reducer;