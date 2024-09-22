export type Header = {
  label: string;
  key: string;
};

export type Child = {
  id: string;
  [key: string]: any;
};

export type RowValue = {
  id: string;
  children: Child[];
  [key: string]: any;
};
