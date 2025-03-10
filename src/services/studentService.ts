import { StudentResponse } from '@/Interfaces/students-table';
import axios from 'axios';

export const getStudent = async (): Promise<StudentResponse> => {
  try {
    const response = await axios.get<StudentResponse>('/students');
    return response.data;
  } catch (error) {
    console.error('Error al traer los estudiantes con Axios:', error);
  }
};

export const deleteStudent = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/students/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al eliminar el estudiante');
  }
};