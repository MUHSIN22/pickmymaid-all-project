import { PersonalInput } from '../../../types/pages/PersonalDetails/manageMaidsInputs';

export const employmentHistoryInputs: PersonalInput[] = [
  {
    label: 'Title',
    field: 'input',
    type: 'text',
    errorMessage: 'Please Enter the job Title',
    key: 'title',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Location',
    field: 'input',
    type: 'text',
    errorMessage: 'Please Enter the job Location',
    key: 'location',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Duration',
    field: 'input',
    type: 'number',
    errorMessage: 'Please Enter the job Duration',
    key: 'experiance',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Reason For Leaving',
    field: 'input',
    type: 'text',
    errorMessage: 'Please Enter Reason',
    key: 'reason_leaving',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
];
