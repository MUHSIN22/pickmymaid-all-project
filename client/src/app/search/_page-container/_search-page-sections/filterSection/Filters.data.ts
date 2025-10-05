import { IFilters } from "@/types/components/SearchPageFilters/searchPagefilters.types";

export const nationality = [
  { id: 1, key: "Philippines", value: "Philippines" },
  { id: 2, key: "India", value: "India" },
  { id: 3, key: "Nepal", value: "Nepal" },
  { id: 4, key: "Indonesia", value: "Indonesia" },
  { id: 5, key: "Bangladesh", value: "Bangladesh" },
  { id: 6, key: "Pakistan", value: "Pakistan" },
  { id: 7, key: "Myanmar", value: "Myanmar" },
  { id: 8, key: "Bhutan", value: "Bhutan" },
  { id: 9, key: "Sri Lanka", value: "Srilanka" },
  { id: 10, key: "Ethiopia", value: "Ethiopia" },
  { id: 16, key: "Eritrea", value: "Eritrea" },
];

export const visaStatus = [
  { id: 1, key: "Visit Visa", value: "Visit Visa" },
  { id: 2, key: "To Be Cancel Visa", value: "To Be Cancel" },
  { id: 3, key: "Own Visa", value: "Own Visa" },
  { id: 4, key: "Husband Visa", value: "Husband Visa" },
  { id: 5, key: "Cancelled Visa", value: "Cancelled Visa" },
];

const services = [
  { id: 1, key: "Maids", value: "Maid" },
  { id: 2, key: "Nanny", value: "Nanny" },
  { id: 3, key: "Caregiver", value: "Caregiver" },
  { id: 4, key: "Private Nurse", value: "Private Nurse" },
  { id: 5, key: "Private Tutor", value: "Private Tutor" },
  { id: 6, key: "Driver", value: "Driver" },
  { id: 7, key: "Postpartum care", value: "Postpartum care" },
  { id: 8, key: "Cook", value: "Cook" },
];

const religion = [
  { id: 1, key: "Christian", value: "christian" },
  { id: 2, key: "Hinduism", value: "hinduism" },
  { id: 3, key: "Islam", value: "islam" },
  { id: 4, key: "Buddhist", value: "buddhist" },
  { id: 5, key: "Sikhism", value: "sikhism" },
];

export const Filters: IFilters[] = [
  {
    name: "Position",
    type: "check_box",
    key: "option",
    id: crypto.randomUUID(),
    items: [
      { id: 2, key: "Live In", value: "Live In" },
      { id: 3, key: "Live Out", value: "Live Out" },
      {
        id: 4,
        key: "Live In And Live Out",
        value: "Live In And Live Out",
      },
    ],
  },
  {
    name: "Location",
    type: "select",
    key: "location",
    id: crypto.randomUUID(),
    items: [
      { id: 1, value: "Abu Dhabi", key: "Abu Dhabi" },
      { id: 2, value: "Dubai", key: "Dubai" },
      { id: 3, value: "Sharjah", key: "Sharjah" },
      { id: 4, value: "Ajman", key: "Ajman" },
      { id: 5, value: "Umm Al Quwain", key: "Umm Al Quwain" },
      {
        id: 6,
        value: "Ras Al Khaimah",
        key: "Ras Al Khaimah",
      },
      { id: 7, value: "Fujairah", key: "Fujairah" },
      { id: 8, value: "Al Ain", key: "Al Ain" },
    ],
  },
  {
    name: "Availability",
    type: "check_box",
    key: "availability",
    id: crypto.randomUUID(),
    items: [
      { id: 1, key: "Hired", value: "Hired" },
      { id: 2, key: "Not Hired", value: "Not Hired" },
    ],
  },
  {
    name: "Category",
    type: "check_box",
    key: "service",
    id: crypto.randomUUID(),
    items: services,
  },
  {
    name: "Religion",
    type: "check_box",
    key: "religion",
    id: crypto.randomUUID(),
    items: religion,
  },
  {
    name: "Visa Status",
    type: "check_box",
    key: "visa",
    id: crypto.randomUUID(),
    items: visaStatus,
  },
  // {
  //   name: 'Skill level',
  //   type: 'check_box',
  //   key: 'skills',
  //   id: crypto.randomUUID(),
  //   items: [
  //     { id: 1, key: 'Newborn Care', value: 'Newborn Care' },
  //     { id: 2, key: 'Child Care', value: 'Child Care' },
  //     { id: 3, key: 'Cooking', value: 'Cooking' },
  //     {
  //       id: 4,
  //       key: 'Assisting in Kitchen',
  //       value: 'Assisting in Kitchen',
  //     },
  //     { id: 5, key: 'Private Tutor', value: 'Private Tutor' },
  //     { id: 6, key: 'Private Nurse', value: 'Private Nurse' },
  //     { id: 7, key: 'Elderly Care', value: 'Elderly Care' },
  //     { id: 8, key: 'Caregiver', value: 'Caregiver' },
  //     {
  //       id: 9,
  //       key: 'Postpartum Care',
  //       value: 'Postpartum Care',
  //     },
  //     {
  //       id: 10,
  //       key: 'Private Driver',
  //       value: 'Private Driver',
  //     },
  //     { id: 11, key: 'Pet Care', value: 'Pet Care' },
  //     { id: 12, key: 'Gardening', value: 'Gardening' },
  //   ],
  // },
  // {
  //   name: 'Age',
  //   type: 'from_to',
  //   key: 'age',
  //   id: crypto.randomUUID(),
  //   items: [
  //     { id: 1, value: 'Min' },
  //     { id: 2, value: 'Max' },
  //   ],
  // },

  {
    name: "Salary",
    type: "check_box",
    key: "salary",
    id: crypto.randomUUID(),
    items: [
      { id: 1, key: "1300-1500", value: "1300-1500" },
      { id: 2, key: "1500-1800", value: "1500-1800" },
      { id: 3, key: "1700-2000", value: "1700-2000" },
      { id: 4, key: "1800-2200", value: "1800-2200" },
      { id: 5, key: "2000-2500", value: "2000-2500" },
      { id: 6, key: "2300-2800", value: "2300-2800" },
      { id: 7, key: "2500-3000", value: "2500-3000" },
      { id: 8, key: "3000-3500", value: "3000-3500" },
      { id: 9, key: "Negotiable", value: "negotiable" },
    ],
  },
  {
    name: "Nationality",
    type: "check_box",
    key: "nationality",
    id: crypto.randomUUID(),
    items: nationality,
  },
];

export const getIntialValue = () => {
  const initialValues: any = {};

  Filters.forEach((item) => {
    if (item.type === "check_box") {
      initialValues[item.key] = false;
      item.items.forEach((checkboxdata) => {
        initialValues[checkboxdata.value] = false;
      });
    } else if (item.type === "select") {
      initialValues[item.key] = "";
    } else if (item.type === "from_to") {
      initialValues[`${item.key}-from`] = "";
      initialValues[`${item.key}-to`] = "";
    }
  });
  return initialValues;
};

export const emptyFilter = {
  position: false,
  "Live In": false,
  "Live Out": false,
  "Live In And Live Out": false,
  location: "",
  availability: false,
  Hired: false,
  "Not Hired": false,
  skills: false,
  "Newborn Care": false,
  "Child Care": false,
  Cooking: false,
  "Assisting in Kitchen": false,
  "Private Tutor": false,
  "Private Nurse": false,
  "Elderly Care": false,
  Caregiver: false,
  "Postpartum Care": false,
  "Private Driver": false,
  "Pet Care": false,
  Gardening: false,
  "Car Washing": false,
  "age-from": "",
  "age-to": "",
  salary: false,
  "1300-1500": false,
  "1500-1800": false,
  "1700-2000": false,
  "1800-2200": false,
  "2000-2500": false,
  "2300-2800": false,
  "2500-3000": false,
  "3000-3500": false,
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
  Uganda: false,
};
