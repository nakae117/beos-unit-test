import axios from 'axios';

export const getStudent = async (): Promise<void> => {
    try {
        const response = await axios.get("/students", { withCredentials: true });
        console.log("Respuesta de MSW:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error al traer los estudiantes');
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