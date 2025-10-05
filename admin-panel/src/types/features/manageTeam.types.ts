// Declare the type of initial state
export type IManageTeamState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'success' | 'error' | 'loading';
  message: string | null;
  teamList: ITeamMember[] | null;
}

// Declare the type of teamList 
export type ITeamMember = {
  userID: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin';
}

// Declare the type of delete return
export type IDeleteMemberReturn = {
  message: string;
  id: string;
}