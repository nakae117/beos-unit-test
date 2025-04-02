export interface Header {
    text: string;
    value: string;
    sortable: boolean;
    width?: number;
}

export interface Subject {
    name: string;
    credits: number;
    studentsEnrolled: number;
    code: string;
    mode: string;
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
    data: T;
    total?: number;
    message?: string;
}

export interface SubjectTable extends Vue {
    isLoading: boolean;
    confirmDelete: boolean;
    headers: Header[];
    students: Subject[];
    options: PaginationOptions;
    total: number,
    loading: boolean,
    footerProps: FooterProps,
    title: string;
    message: string;
    textConfirm: string;
    detailStudent: Partial<Subject>,
    setInfoDelete(item: Subject): void;
}