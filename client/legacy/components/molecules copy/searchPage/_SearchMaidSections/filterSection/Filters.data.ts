import { IFilters } from '@/types/components/SearchPageFilters/searchPagefilters.types';

export const nationality = [
  { id: 1, key: 'searchmaid.filter.Philippines', value: 'Philippines' },
  { id: 2, key: 'searchmaid.filter.India', value: 'India' },
  { id: 3, key: 'searchmaid.filter.Nepal', value: 'Nepal' },
  { id: 4, key: 'searchmaid.filter.Indonesia', value: 'Indonesia' },
  { id: 5, key: 'searchmaid.filter.Bangladesh', value: 'Bangladesh' },
  { id: 6, key: 'searchmaid.filter.Pakistan', value: 'Pakistan' },
  { id: 7, key: 'searchmaid.filter.Myanmar', value: 'Myanmar' },
  { id: 8, key: 'searchmaid.filter.Bhutan', value: 'Bhutan' },
  { id: 9, key: 'searchmaid.filter.Srilanka', value: 'Srilanka' },
  { id: 10, key: 'searchmaid.filter.Ethiopia', value: 'Ethiopia' },
  { id: 16, key: 'searchmaid.filter.Eritrea', value: 'Eritrea' }
];

export const visaStatus = [
  { id: 1, key: 'searchmaid.filter.visitVisa', value: 'Visit Visa' },
  { id: 2, key: 'searchmaid.filter.toBeCancel', value: 'To Be Cancel' },
  { id: 3, key: 'searchmaid.filter.ownVisa', value: 'Own Visa' },
  { id: 4, key: 'searchmaid.filter.husbandVisa', value: 'Husband Visa' },
  { id: 5, key: 'searchmaid.filter.cancelledVisa', value: 'Cancelled Visa' }
];

const services = [
  { id: 1, key: 'common.categories.maids', value: 'Maid' },
  { id: 1, key: 'common.categories.nanny', value: 'Nanny' },
  { id: 1, key: 'common.categories.caregiver', value: 'Caregiver' },
  { id: 1, key: 'common.categories.private_nurse', value: 'Private Nurse' },
  { id: 1, key: 'common.categories.private_tutor', value: 'Private Tutor' },
  { id: 1, key: 'common.categories.driver', value: 'Driver' },
  { id: 1, key: 'common.categories.postpartum_care', value: 'Postpartum care' },
  { id: 1, key: 'common.categories.cook', value: 'Cook' }
];

const religion = [
  { id: 1, key: 'common.religion.christian', value: 'christian' },
  { id: 2, key: 'common.religion.hinduism', value: 'hinduism' },
  { id: 3, key: 'common.religion.islam', value: 'islam' },
  { id: 4, key: 'common.religion.buddhist', value: 'buddhist' },
  { id: 5, key: 'common.religion.sikhism', value: 'sikhism' },

]

export const Filters: IFilters[] = [
  {
    name: 'searchmaid.filter.Position',
    type: 'check_box',
    key: 'option',
    id: crypto.randomUUID(),
    items: [
      { id: 2, key: 'searchmaid.filter.Live In', value: 'Live In' },
      { id: 3, key: 'searchmaid.filter.Live Out', value: 'Live Out' },
      {
        id: 4,
        key: 'searchmaid.filter.Live In And Live Out',
        value: 'Live In And Live Out'
      }
    ]
  },
  {
    name: 'searchmaid.filter.Location',
    type: 'select',
    key: 'location',
    id: crypto.randomUUID(),
    items: [
      { id: 1, value: 'Abu Dhabi', key: 'searchmaid.filter.Abu Dhabi' },
      { id: 1, value: 'Dubai', key: 'searchmaid.filter.Dubai' },
      { id: 1, value: 'Sharjah', key: 'searchmaid.filter.Sharjah' },
      { id: 1, value: 'Ajman', key: 'searchmaid.filter.Ajman' },
      { id: 1, value: 'Umm Al Quwain', key: 'searchmaid.filter.Umm Al Quwain' },
      {
        id: 1,
        value: 'Ras Al Khaimah',
        key: 'searchmaid.filter.Ras Al Khaimah'
      },
      { id: 1, value: 'Fujairah', key: 'searchmaid.filter.Fujairah' },
      { id: 1, value: 'Al Ain', key: 'searchmaid.filter.Al Ain' }
    ]
  },
  {
    name: 'searchmaid.filter.Availability',
    type: 'check_box',
    key: 'availability',
    id: crypto.randomUUID(),
    items: [
      { id: 1, key: 'searchmaid.filter.Hired', value: 'Hired' },
      { id: 2, key: 'searchmaid.filter.Not Hired', value: 'Not Hired' }
    ]
  },
  {
    name: 'searchmaid.filter.category',
    type: 'check_box',
    key: 'service',
    id: crypto.randomUUID(),
    items: services
  },
  {
    name: 'searchmaid.filter.religion',
    type: 'check_box',
    key: 'religion',
    id: crypto.randomUUID(),
    items: religion
  },
  {
    name: 'searchmaid.filter.visaStatus',
    type: 'check_box',
    key: 'visa',
    id: crypto.randomUUID(),
    items: visaStatus
  },
  // {
  //   name: 'searchmaid.filter.Skill level',
  //   type: 'check_box',
  //   key: 'skills',
  //   id: crypto.randomUUID(),
  //   items: [
  //     { id: 1, key: 'searchmaid.filter.Newborn Care', value: 'Newborn Care' },
  //     { id: 2, key: 'searchmaid.filter.Child Care', value: 'Child Care' },
  //     { id: 3, key: 'searchmaid.filter.Cooking', value: 'Cooking' },
  //     {
  //       id: 4,
  //       key: 'searchmaid.filter.Assisting in Kitchen',
  //       value: 'Assisting in Kitchen',
  //     },
  //     { id: 5, key: 'searchmaid.filter.Private Tutor', value: 'Private Tutor' },
  //     { id: 6, key: 'searchmaid.filter.Private Nurse', value: 'Private Nurse' },
  //     { id: 7, key: 'searchmaid.filter.Elderly Care', value: 'Elderly Care' },
  //     { id: 8, key: 'searchmaid.filter.Caregiver', value: 'Caregiver' },
  //     {
  //       id: 9,
  //       key: 'searchmaid.filter.Postpartum Care',
  //       value: 'Postpartum Care',
  //     },
  //     {
  //       id: 10,
  //       key: 'searchmaid.filter.Private Driver',
  //       value: 'Private Driver',
  //     },
  //     { id: 11, key: 'searchmaid.filter.Pet Care', value: 'Pet Care' },
  //     { id: 12, key: 'searchmaid.filter.Gardening', value: 'Gardening' },
  //   ],
  // },
  // {
  //   name: 'searchmaid.filter.Age',
  //   type: 'from_to',
  //   key: 'age',
  //   id: crypto.randomUUID(),
  //   items: [
  //     { id: 1, value: 'Min' },
  //     { id: 2, value: 'Max' },
  //   ],
  // },

  {
    name: 'searchmaid.filter.Salary',
    type: 'check_box',
    key: 'salary',
    id: crypto.randomUUID(),
    items: [
      { id: 1, key: '1300-1500', value: '1300-1500' },
      { id: 2, key: '1500-1800', value: '1500-1800' },
      { id: 3, key: '1700-2000', value: '1700-2000' },
      { id: 4, key: '1800-2200', value: '1800-2200' },
      { id: 5, key: '2000-2500', value: '2000-2500' },
      { id: 6, key: '2300-2800', value: '2300-2800' },
      { id: 7, key: '2500-3000', value: '2500-3000' },
      { id: 8, key: '3000-3500', value: '3000-3500' },
      { id: 9, key: 'Negotiable', value: 'negotiable'}
    ]
  },
  {
    name: 'searchmaid.filter.Nationality',
    type: 'check_box',
    key: 'nationality',
    id: crypto.randomUUID(),
    items: nationality
  }
];

export const getIntialValue = () => {
  const initialValues = {};

  Filters.forEach((item) => {
    if (item.type === 'check_box') {
      initialValues[item.key] = false;
      item.items.forEach((checkboxdata) => {
        initialValues[checkboxdata.value] = false;
      });
    } else if (item.type === 'select') {
      initialValues[item.key] = '';
    } else if (item.type === 'from_to') {
      initialValues[`${item.key}-from`] = '';
      initialValues[`${item.key}-to`] = '';
    }
  });
  return initialValues;
};

export const emptyFilter = {
  position: false,
  'Live In': false,
  'Live Out': false,
  'Live In And Live Out': false,
  location: '',
  availability: false,
  Hired: false,
  'Not Hired': false,
  skills: false,
  'Newborn Care': false,
  'Child Care': false,
  Cooking: false,
  'Assisting in Kitchen': false,
  'Private Tutor': false,
  'Private Nurse': false,
  'Elderly Care': false,
  Caregiver: false,
  'Postpartum Care': false,
  'Private Driver': false,
  'Pet Care': false,
  Gardening: false,
  'Car Washing': false,
  'age-from': '',
  'age-to': '',
  salary: false,
  '1300-1500': false,
  '1500-1800': false,
  '1700-2000': false,
  '1800-2200': false,
  '2000-2500': false,
  '2300-2800': false,
  '2500-3000': false,
  '3000-3500': false,
  nationality: false,
  Philippines: false,
  India: false,
  Nepal: false,
  Indonesia: false,
  Bangladesh: false,
  Pakistan: false,
  Myanmar: false,
  Bhutan: false,
  Srilanka: false,
  Ethiopia: false,
  Kenya: false,
  Nigeria: false,
  Ghana: false,
  Cameroon: false,
  Zimbabwe: false,
  Eritrea: false,
  Uganda: false
};
