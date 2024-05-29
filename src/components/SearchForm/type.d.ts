import type { TableProps } from "ant-design-vue";
export type queryType = Record<string, any>;
export interface ColunmType extends TableProps["columns"] {
  title: string;
  dataIndex: string;
  search?: boolean;
  type?: "input" | "select" | "tree" | "datePicker" | "rangePicker";
  allowClear?: boolean;
  options?: Promise<Record<string, number | string>[]> | Record<string, number | string>[];
  format?: string;
  slot?: boolean;
  span?: number;
  placeholder?: string;
  label?: string;
}
