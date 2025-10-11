export type IFilters = {
  name: string;
  id: string;
  type: string;
  key: string;
  items: {
    id: number | string;
    value: string;
    key?: string;
  }[];
};
