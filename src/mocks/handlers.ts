import { http, HttpResponse } from 'msw';

export const handlers = [
  // Manejador para la solicitud GET /student
  http.get('/students', async () => {
    console.log('Intercepted GET /api/students');
    try {
      // Simula una respuesta exitosa con datos
      return HttpResponse.json({
        data: [
          {
            id: 1,
            first_name: 'David',
            last_name: 'Williams',
            email: 'david@gmail.com',
            age: '39',
            gender: 'M',
            degree: 'Dr.',
            phone: '+1 (910) 487-7111',
            created_at: '2025-01-10T13:38:50.000000Z',
            updated_at: '2025-01-10T13:38:50.000000Z',
          },
        ],
        total: 1,
      });
    } catch (error) {
      // Simula un error en la petición GET
      return HttpResponse.json(
        { message: 'Error al obtener los estudiantes' },
        { status: 500 }
      );
    }
  }),

  // Manejador para la solicitud DELETE /student/delete/:id
  http.delete('/students/:id', async ({ params }) => {
    try {
      const { id } = params;

      // Simula un caso en el que el estudiante no existe
      if (id !== '1') {
        return HttpResponse.json(
          { message: `No se encontró el estudiante con ID ${id}` },
          { status: 404 }
        );
      }

      // Simula una eliminación exitosa
      return HttpResponse.json({ message: `Student ${id} deleted` });
    } catch (error) {
      // Simula un error en la petición DELETE
      return HttpResponse.json(
        { message: 'Error al eliminar el estudiante' },
        { status: 500 }
      );
    }
  }),
];