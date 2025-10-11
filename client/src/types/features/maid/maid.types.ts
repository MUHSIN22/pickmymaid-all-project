export type IMaidState = {
  error: boolean;
  loading: boolean;
  status: 'idle' | 'error' | 'success' | 'loading';
  message: string | null;
  data: IMaidListItem[] | null;
  filterdData: any;
  filter: any;
  singleMaid: any;
  counts: IMaidCountType | null;
  featuredMaid: IFeaturedMaidCard[] | null;
  totalLength: number;
  filterdDataBackup: any;

  maids: {[key:string] : IMaidListItem[]};
  maidsCount: number;
};

export type IMaidListItem = {
  option: 'Live-in' | 'Live-out';
  location:
  | 'Abu Dhabi'
  | 'Dubai'
  | 'Sharjah'
  | 'Ajman'
  | 'Umm Al Quwain'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Al Ain';
  availability: boolean;
  skills: string;
  age: number;
  salary: { from: number; to: number };
  nationality: string;
  name: string;
  id: string;
  service: string;
  profile: string;
  references: boolean;
  youtubeLink: string;
  postedDate: Date | string;
  employmentHistory: any[];
  isInWishlist: boolean;
  refNumber: number | string;
};

export type IFeaturedMaidCard = {
  id: string;
  refNumber: string;
  name: string;
  experience: number;
  profile: string;
  salary: {
    from: number;
    to: number;
  };
  nationality: string;
  option: string;
  reference: boolean;
  service: string;
  hired: boolean;
  postedDate: Date | string;
  youtubeLink: string;
  isInWishlist: boolean;
}


export type IMaidCountType = {
  nationalityCounts: { count: number, id: string }[],
  serviceCounts: { count: number, id: string }[],
  totalCounts: number
}