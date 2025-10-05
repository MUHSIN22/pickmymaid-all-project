export interface IManageMaidData {
  jobApplication: JobApplication;
}

export interface JobApplication {
  salary: Salary;
  _id: string;
  ref_number: string;
  name: string;
  email: string;
  mobile: string;
  profile: string;
  age: number;
  marital_status: string;
  nationality: string;
  location: string;
  religion: string;
  uae_no: string;
  whatsapp_no: string;
  botim_number: string;
  service: string;
  current_location: string;
  visa_status: string;
  availability: boolean;
  skills: string[];
  language: Language[];
  option: string;
  employmentHistory: EmploymentHistory[];
  word_file: any[];
  education: string;
  notes: string;
  available_from: string;
  visa_expire: string;
  references: boolean;
  status: number;
  day_of: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EmploymentHistory {
  job_description: string;
  title: string;
  experiance: number;
  reason_leaving: string;
  location: string;
  _id: string;
}

export interface Language {
  id: string;
  name: string;
  read: number;
  write: number;
  speak: number;
  _id: string;
}

export interface Salary {
  from: number;
  to: number;
}
