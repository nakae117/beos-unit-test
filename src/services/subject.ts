import { ApiResponse, Subject } from '@/Interfaces/subjects';
import axios from 'axios';

export const getSubjects = async (): Promise<ApiResponse<Subject[]>> => {
    try {
        return axios.get<ApiResponse<Subject[]>>('/subjects').then(response => response.data);
    } catch (error) {
        console.error('Error fetching subjects with Fetch:', error);
    }
}

export const postSubjects = async (data: Subject): Promise<ApiResponse<Subject>> => {
    try {
        return axios.post<ApiResponse<Subject>>('/subjects', data).then(response => response.data);
    } catch (error) {
        console.error(error);
    }
}

export const updateSubject = async (code: string, data: Partial<Subject>): Promise<ApiResponse<Subject>> => {
    try {
        return axios.put<ApiResponse<Subject>>(`/subjects/${code}`, data).then(response => response.data);
    } catch (error) {
        console.error('Error updating subject:', error);
        throw error;
    }
};

export const deleteSubject = async (code: string): Promise<ApiResponse<{ message: string }>> => {
    try {
        return axios.delete<ApiResponse<{ message: string }>>(`/subjects/${code}`).then(response => response.data);
    } catch (error) {
        console.error('Error deleting subject:', error);
        throw error;
    }
};
