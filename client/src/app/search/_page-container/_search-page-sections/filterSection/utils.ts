const multipleInputs = [
  'nationality',
  'option',
  'salary',
  'skills',
  'availability',
  'service',
  'religion',
  'visa'
];
const singleInputs = ['location', 'sort', 'page'];

export const getAllFiltersByQuery = (queries: any, initial: any) => {
  let multiple: any[] = [];
  Object.keys(queries)?.forEach((item) => {
    if (multipleInputs.includes(item) && queries[item]) {
      // first we are separating the values by ','
      const separatedbycomma: string[] = queries[item]?.split(',');
      multiple = [...multiple, ...separatedbycomma];
    }
  });

  const checkBoxInputs = { ...initial };
  multiple?.forEach((item) => {
    checkBoxInputs[item] = true;
  });
  return { checkBoxInputs };
};

/**
 * adding the filtered data to the filterstate
 * @date 11/1/2023 - 11:23:24 PM
 */
export const getAllQueriestoFilterState = (queries: any) => {
  const filterObject: any[] = [];
  Object.keys(queries)?.forEach((item) => {
    if (multipleInputs.includes(item) && queries[item]) {
      // first we are separating the values by ','
      const separatedbycomma: string[] = queries[item]?.split(',');
      const obj = { type: 'multiple', key: item, values: separatedbycomma };
      filterObject.push(obj);
    } else if (singleInputs?.includes(item) && queries[item]) {
      const obj = { type: 'single', key: item, values: queries[item] };
      filterObject.push(obj);
    }
  });
  return filterObject;
};
