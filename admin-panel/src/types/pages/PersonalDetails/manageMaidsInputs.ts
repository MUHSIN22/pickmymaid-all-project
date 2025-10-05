export interface PersonalInput {
  label: string;
  field: 'input' | 'select' | 'multiSelect'| 'date' ;
  type?: string;
  values?: { key: string; value: string }[];
  multiValues?: { label: string; value: string }[];
  errorMessage: string;
  key: string;
  id: string;
  isDisabled: boolean;
  required: boolean;
}
