export interface ToastParams {
    title: string;
    message: string;
    type: typeToast;
    errors?: string[];
    duration?: number;
    close?: boolean;
}

type typeToast = "success" | "warning" | "error";