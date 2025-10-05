export type IJobState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'error' | 'success' | 'loading';
  message: string | null;
  data: IJobListItem[] | null;
  singlejob: any;
  filterdData: any;
  filterdDataBackup: any;
  searchResults: IJobListItem[];
  totalLength: number;
};

export type IJobListItem = {
  location: string;
  status: number;
  nationality: string;
  title: string;
  _id: string;
  service: string;
  commitment: string;
  image: string;
};

// Declare the type of register return
export type IJobSearchReturn = {
  message: string;
  data: IJobListItem[];
};

export type IJobSearchBodyState = {
  service: string;
  nationality: string;
  location: string;
};

export type IjobHandleSubmitBody = {
  location: string;
  nationality: string;
  service: string;
};
