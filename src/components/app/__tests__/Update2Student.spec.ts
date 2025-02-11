import { render, fireEvent, screen, waitFor, within } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Vue from 'vue';
import Vuetify from 'vuetify';
import StudentTable from '@/components/student/StudentsTableTest.vue';
import EditStudent from '@/components/student/UpdateStudent.vue';
import { Student } from '@/Interfaces/Student.interface';

Vue.use(Vuetify);

describe('StudentTable.vue - Editar Estudiante', () => {
    const mockStudent: Student = {
        id: 1,
        first_name: 'Yetsimar',
        last_name: 'Rodriguez',
        email: 'yetsimar.rodriguez@example.com',
        age: '25',
        gender: 'M',
        degree: 'Licenciatura',
        phone: '04141234567',
    };

    let mockStudents: Student[];



    beforeEach(() => {
        // Configuración necesaria para Vuetify antes de cada prueba
        const app = document.createElement('div');
        app.setAttribute('data-app', 'true');
        document.body.appendChild(app);
        //  Restaurar los datos originales antes de cada prueba
        mockStudents = [
            {
                id: 1,
                first_name: 'Yetsimar',
                last_name: 'Rodriguez',
                email: 'yetsimar.rodriguez@example.com',
                age: '25',
                gender: 'M',
                degree: 'Licenciatura',
                phone: '04141234567',
            },
            {
                id: 2,
                first_name: 'Karina',
                last_name: 'Medina',
                email: 'karina.medina@example.com',
                age: '22',
                gender: 'F',
                degree: 'Ingeniería',
                phone: '04142345678',
            }
        ];
    });
    // Función auxiliar para renderizar el componente con la configuración necesaria
    const renderComponent = () => {
        const vuetify = new Vuetify();
        return render(StudentTable, {
            vuetify,
            stubs: {
                EditStudent,
            },
            data() {
                return {
                    isEditModalOpen: false,
                    selectedStudent: null,
                    students: mockStudents, //para evitar mutaciones globales
                    total: 1,
                    loading: false,
                };
            },
        });
    };

    // Verifica que el modal esté inicialmente cerrado
    it('Inicialmente el modal debe estar cerrado', () => {
        renderComponent();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Verifica que el modal se abra al hacer clic en el botón de editar
    it('Abre el modal al hacer clic en el botón de editar', async () => {
        renderComponent();
        // Busca el botón de editar por su texto
        // const editButton = screen.getByTitle('Editar');
        const studentRow = screen.getByText('Yetsimar').closest('tr');
        const editButton = within(studentRow).getByTitle('Editar');
        await fireEvent.click(editButton);

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText('Edit Student')).toBeInTheDocument();
    });

    describe('Validación de Formulario', () => {
        // Prueba la validación del campo nombre
        it('Valida el campo nombre', async () => {
            renderComponent();

            // Abre el modal
            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            // Obtiene el input de nombre por su etiqueta
            const firstNameInput = screen.getByLabelText(/Nombre/);

            // Prueba entrada inválida
            await fireEvent.update(firstNameInput, '123Invalid!');
            //Verificamos que muestre el mensaje de error valido
            const errorMessage = await screen.findByText(/No pueden contener números ni caracteres especiales/);
            expect(errorMessage).toBeInTheDocument();

            // Prueba entrada válida
            await fireEvent.update(firstNameInput, 'Karina');
            await waitFor(() => {
                //Verificamos que el mensaje de error ya no aparezca
                expect(screen.queryByText(/No pueden contener números ni caracteres especiales/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo apellido
        it('Valida el campo apellido', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const lastNameInput = screen.getByLabelText(/Apellido/);

            await fireEvent.update(lastNameInput, 'Invalid@123');
            const errorMessage = await screen.findByText(/No pueden contener números ni caracteres especiales/);
            expect(errorMessage).toBeInTheDocument();

            await fireEvent.update(lastNameInput, 'Rodriguez');
            await waitFor(() => {
                expect(screen.queryByText(/No pueden contener números ni caracteres especiales/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo email
        it('Valida el campo email', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const emailInput = screen.getByLabelText('Correo Electrónico');

            await fireEvent.update(emailInput, 'invalid-email');
            const errorMessage = await screen.findByText(/Debe ser un correo electrónico válido/);
            expect(errorMessage).toBeInTheDocument();

            await fireEvent.update(emailInput, 'valid.email@example.com');
            await waitFor(() => {
                expect(screen.queryByText(/Debe ser un correo electrónico válido/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo edad
        it('Valida el campo edad', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const ageInput = screen.getByLabelText(/Edad/);

            await fireEvent.update(ageInput, '3');
            const errorMessage = await screen.findByText(/La edad mínima es 4 años/);
            expect(errorMessage).toBeInTheDocument();

            await fireEvent.update(ageInput, '25');
            await waitFor(() => {
                expect(screen.queryByText(/La edad mínima es 4 años/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo teléfono
        it('Valida el campo teléfono', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const phoneInput = screen.getByLabelText(/Teléfono/);

            await fireEvent.update(phoneInput, '04141234');
            const errorMessage = await screen.findByText(/Debe contener exactamente 11 dígitos/);
            expect(errorMessage).toBeInTheDocument();

            await fireEvent.update(phoneInput, '04142345678');
            await waitFor(() => {
                expect(screen.queryByText(/Debe contener exactamente 11 dígitos/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo género
        it('Valida la selección de género', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const genderSelect = screen.getByLabelText(/Género/);

            // Limpia la selección
            await fireEvent.update(genderSelect, '');
            const errorMessage = await screen.findByText(/Debe seleccionar un género/);
            expect(errorMessage).toBeInTheDocument();

            // Selecciona una opción válida
            await fireEvent.update(genderSelect, 'F');
            await waitFor(() => {
                expect(screen.queryByText(/Debe seleccionar un género/)).not.toBeInTheDocument();
            });
        });

        // Prueba la validación del campo grado
        it('Valida el campo grado', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            const degreeInput = screen.getByLabelText(/Grado o Curso/);

            await fireEvent.update(degreeInput, 'Invalid123');
            const errorMessage = await screen.findByText(/Debe contener solo letras y espacios/);
            expect(errorMessage).toBeInTheDocument();

            await fireEvent.update(degreeInput, 'Licenciatura');
            await waitFor(() => {
                expect(screen.queryByText(/Debe contener solo letras y espacios/)).not.toBeInTheDocument();
            });
        });
    });

    describe('Guardar Cambios', () => {
        // Prueba el guardado exitoso de cambios
        it('Guarda los cambios y cerrar el modal', async () => {
            renderComponent();

            // Abre el modal
            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            // Actualiza los campos
            await fireEvent.update(screen.getByLabelText(/Nombre/), 'Karinas');
            await fireEvent.update(screen.getByLabelText(/Apellido/), 'Medina');
            await fireEvent.update(screen.getByLabelText(/Género/), 'F');
            await fireEvent.update(screen.getByLabelText(/Teléfono/), '04142345678');

            // Guarda los cambios
            const saveButton = screen.getByRole('button', { name: /Guardar/ });
            await fireEvent.click(saveButton);

            // Espera a que el modal se cierre
            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            });

            screen.debug(); // Inspecciona si la tabla realmente se actualizó

            // Verifica que los datos se actualizaron en la tabla
            // Busca la fila del estudiante en lugar de solo el texto
            const updatedStudentRow = await waitFor(() => screen.getByText('Karinas').closest('tr'));
            expect(within(updatedStudentRow).getByText('Medina')).toBeInTheDocument();

        });

        // Prueba que no se guarden cambios con formulario inválido
        it('No debe guardar cuando el formulario es inválido', async () => {
            renderComponent();

            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            // Establece datos inválidos
            await fireEvent.update(screen.getByLabelText(/Nombre/), '123Invalid!');

            // Intenta guardar
            const saveButton = screen.getByRole('button', { name: /Guardar/ });
            await fireEvent.click(saveButton);

            // El modal debe permanecer abierto
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            // El mensaje de error debe ser visible
            expect(screen.getByText(/No pueden contener números ni caracteres especiales/)).toBeInTheDocument();
        });
    });

    describe('Cancelar Cambios', () => {
        // Prueba la cancelación de cambios
        it('Cierra el modal sin guardar cambios al hacer clic en cancelar', async () => {
            renderComponent();

            // Abre el modal
            const studentRow = screen.getByText('Yetsimar').closest('tr');
            const editButton = within(studentRow).getByTitle('Editar');
            await fireEvent.click(editButton);

            // Realiza algunos cambios
            await fireEvent.update(screen.getByLabelText(/Nombre/), 'Changed Name');

            // Hace clic en cancelar
            const cancelButton = screen.getByRole('button', { name: /Cancelar/ });
            await fireEvent.click(cancelButton);

            // Verifica que el modal se cerró
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            // Verifica que los datos originales no cambiaron
            expect(screen.getByText(mockStudent.first_name)).toBeInTheDocument();
        });
    });
});