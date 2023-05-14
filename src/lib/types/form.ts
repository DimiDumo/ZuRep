export enum FormItemType {
  string, // one line text input
  number,
  text, // multi line text input
  radio,
  boolean
}

export type FormItem = {
  name: string;
  columnName: string;
  type: FormItemType;
  required?: boolean;
  description?: string;
  options?: string[];
};

export type Form = {
  title: string;
  description: string;
  formItems: FormItem[];
};
