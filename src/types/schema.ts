export interface Field {
  id: string;
  name: string;
  type: "String" | "Number" | "Boolean" | "Array" | "Nested";
  value?: string | number | boolean | ArrayElement[];
  children?: Field[];
}

export interface ArrayElement {
  id: string;
  type: "String" | "Number" | "Boolean";
  value: string | number | boolean;
}

export type FieldType = "String" | "Number" | "Boolean" | "Array" | "Nested";
