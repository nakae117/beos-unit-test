import { StudentResponse } from '@/Interfaces/students-table';
import axios from 'axios';

export const getStudent = async (): Promise<StudentResponse> => {
    try {
      console.log("Realizando GET /students con Axios...");
      const response = await axios.get<StudentResponse>('/students');
      console.log("Respuesta de MSW con Axios:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error al traer los estudiantes con Axios:', error);
    }
  };

export const deleteStudent = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(`/students/${id}`);
        console.log("ELIMINADO");
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el estudiante');
    }
};