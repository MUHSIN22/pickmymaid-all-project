// Declare the type of register form
export type IRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type IBasicForm = {
  firstName: string;
  email: string;
  phone: string;
  password: string;
  emiratesOfResidance: string;
  positionRequired: string;
}

export type IAdditionalDetails = {
  proposedSalary: string;
  area: string;
  numOfFamily: number;
  accomodationType: string;
  hearedFrom: string;
  nationalityPreference: string;
  additionalRequirement: string
}

// Declare the type of job application form
export type IJobApplicationForm = {
  name: string;
  email: string;
  mobile: string;
}

// Declare the type of Login form
export type ILoginForm = {
  email: string;
  password: string;
}

// Declare the type of Forgot password form
export type IForgetPasswordForm = {
  email: string;
}

// Declare the the type of reset password 
export type IResetPassword = {
  password: string;
  confirmPassword: string;
}