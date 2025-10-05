export type IManageMaid = {
  name: string;
  email: string;
  mobile: string;
  age: number;
  marital_status: string;
  nationality: string;
  religion: string;
  salary: {
    from: string;
    to: string;
  };
  uae_no: string;
  whatsapp_no: string;
  botim_number: string;
  current_location: string;
  youtube_link: string;
  visa_status: string;
  availability: boolean;
  skills: string;
  education: string;
  notes: string;
  references: boolean;
  id?:string
};
