export interface Header {
  text: string;
  value: string;
  sortable: boolean;
  width?: number;
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  gender: string;
  degree: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface StudentResponse {
  data: Student[];
  total: number;
}

export interface PaginationOptions {
  page: number;
  sort_by: string;
  sort_desc: string;
  per_page: number;
}

export interface FooterProps {
  "items-per-page-options": number[];
  "show-first-last-page": boolean;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
}

export interface StudentTable extends Vue {
  isLoading: boolean;
  confirmDelete: boolean;
  headers: Header[];
  students: Student[];
  options: PaginationOptions;
  total: number,
  loading: boolean,
  footerProps: FooterProps,
  title: string;
  message: string;
  textConfirm: string;
  detailStudent: Partial<Student>,
  setInfoDelete(item: Student): void;
}