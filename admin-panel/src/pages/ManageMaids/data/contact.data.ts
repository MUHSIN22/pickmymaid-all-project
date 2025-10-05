import { PersonalInput } from '../../../types/pages/PersonalDetails/manageMaidsInputs';

export const ContactsInput: PersonalInput[] = [
  {
    label: 'UAE Calling Number',
    field: 'input',
    type: 'tel',
    errorMessage: 'Please Enter the UAE Calling Number',
    key: 'uaenumber',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Botim Calling Number',
    field: 'input',
    type: 'tel',
    errorMessage: 'Please Enter the Botim Calling Number',
    key: 'botimnumber',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Whatsapp Number',
    field: 'input',
    type: 'tel',
    errorMessage: 'Please Enter the Whatsapp Number',
    key: 'whatsappnumber',
    required: false,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
  {
    label: 'Current Location',
    field: 'input',
    type: 'text',
    errorMessage: 'Please Enter the Current Location',
    key: 'clocation',
    required: true,
    isDisabled: false,
    id: crypto.randomUUID(),
  },
];
