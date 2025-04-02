import { Student } from '@/Interfaces/Student.interface';
import { Subject } from '@/Interfaces/subjects';
import { http, HttpResponse } from 'msw';
const students: Student[] = [
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
  {
    id: 2,
    first_name: 'Yetsimar',
    last_name: 'Rodriguez',
    email: 'yetsimar.rodriguez@example.com',
    age: '25',
    gender: 'M',
    degree: 'Licenciatura',
    phone: '04141234567',
  },
  {
    id: 3,
    first_name: 'Karina',
    last_name: 'Medina',
    email: 'karina.medina@example.com',
    age: '22',
    gender: 'F',
    degree: 'Ingeniería',
    phone: '04142345678',
  }
];

const subjects: Subject[] = [{
  name: 'Mathematics',
  credits: 3,
  studentsEnrolled: 25,
  code: 'I290',
  mode: 'online',
},
{
  name: 'Physics',
  credits: 4,
  studentsEnrolled: 30,
  code: 'P101',
  mode: 'presencial',
},
{
  name: 'Chemistry',
  credits: 3,
  studentsEnrolled: 20,
  code: 'C202',
  mode: 'híbrido',
}]
export const handlers = [
  // Manejador para la solicitud GET /student
  http.get('/students', () => {
    try {
      // Simula una respuesta exitosa con datos
      return HttpResponse.json({
        data: students,
        total: students.length,
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
  http.delete('/students/:id', ({ params }) => {
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

  // Manejador PUT/PATCH para editar estudiante
  http.put('/students/:id', async ({ params, request }) => {
    try {
      const { id } = params;
      const studentIndex = students.findIndex(student => student.id === Number(id));

      if (studentIndex === -1) {
        return HttpResponse.json(
          { message: `No se encontró el estudiante con ID ${id}` },
          { status: 422 }
        );
      }

      const updatedData = await request.json() as Student;


      // Actualiza solo los campos enviados
      students[studentIndex] = {
        ...students[studentIndex],
        ...updatedData,
        updated_at: new Date().toISOString(),
      };

      return HttpResponse.json({
        message: 'Estudiante actualizado con éxito',
        data: students[studentIndex],
      });
    } catch (error) {
      return HttpResponse.json(
        { message: 'Error al actualizar el estudiante' },
        { status: 500 }
      );
    }
  }),

  http.get('/subjects', async () => {
    try {
      return HttpResponse.json({
        data: subjects, total: 3
      });
    } catch (error) {
      return HttpResponse.json(
        { message: 'Error al obtener las materias' },
        { status: 500 }
      );
    }
  }),

  http.post('/subjects', async ({ request }) => {
    try {
      const newSubject = await request.json() as Subject;

      // Validamos que los campos requeridos estén presentes
      if (!newSubject.name || !newSubject.credits || !newSubject.code || !newSubject.mode) {
        return HttpResponse.json(
          { message: 'Todos los campos son obligatorios' },
          { status: 400 }
        );
      }

      subjects.push(newSubject);

      return HttpResponse.json({
        message: 'Materia creada con éxito',
        data: newSubject,
      }, { status: 201 });

    } catch (error) {
      return HttpResponse.json(
        { message: 'Error al crear la materia' },
        { status: 500 }
      );
    }
  }),


  http.put('/subjects/:code', async ({ params, request }) => {
    try {
      const { code } = params;
      const subjectIndex = subjects.findIndex(subject => subject.code === code);

      if (subjectIndex === -1) {
        return HttpResponse.json(
          { message: `No se encontró la materia con código ${code}` },
          { status: 404 }
        );
      }

      const updatedData = await request.json() as Partial<Subject>;

      // Actualiza solo los campos proporcionados
      subjects[subjectIndex] = {
        ...subjects[subjectIndex],
        ...updatedData,
      };

      return HttpResponse.json({
        message: 'Materia actualizada con éxito',
        data: subjects[subjectIndex],
      });
    } catch (error) {
      return HttpResponse.json(
        { message: 'Error al actualizar la materia' },
        { status: 500 }
      );
    }
  }),

  http.delete('/subjects/:code', ({ params }) => {
    try {
      const { code } = params;

      // Simula un caso en el que la materia no existe
      const subjectIndex = subjects.findIndex(subject => subject.code === code);
      if (subjectIndex === -1) {
        return HttpResponse.json(
          { message: `No se encontró la materia con código ${code}` },
          { status: 404 }
        );
      }

      // Elimina la materia si existe
      subjects.splice(subjectIndex, 1);

      return HttpResponse.json({ message: `Materia eliminada con éxito` });
    } catch (error) {
      // Simula un error en la petición DELETE
      return HttpResponse.json(
        { message: 'Error al eliminar la materia' },
        { status: 500 }
      );
    }
  }),
];