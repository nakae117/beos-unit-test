import { mount, createLocalVue, Wrapper, VueClass } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import StudentTable from '@/components/student/StudentsTableTest.vue';
import EditStudent from '@/components/student/UpdateStudent.vue';
import { Student } from '@/Interfaces/Student.interface';

const localVue = createLocalVue();
Vue.use(Vuetify);

//Definimos las interfaces de los componentes
interface EditStudentComponentType extends Vue {
    formStudent: Student;
    $refs: {
        form: Vue & {
            validate: () => boolean;
        };
    };
    $data: {
        formStudent: Student;
    };
}

interface StudentTableType extends Vue {
    isEditModalOpen: boolean;
    selectedStudent: Student | null;
    students: Student[];
    total: number;
    loading: boolean;
}
describe('StudentTable.vue - Editar Estudiante', () => {
    let vuetify: Vuetify;
    let wrapper: Wrapper<StudentTableType>;

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

    const mockStudents: Student[] = [
        mockStudent,
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

    beforeEach(() => {
        const app = document.createElement('div');
        app.setAttribute('data-app', 'true');
        document.body.appendChild(app);
        vuetify = new Vuetify();

        wrapper = mount(StudentTable as VueClass<StudentTableType>, { // El VueClass es para tipar los componentes padres ya que tienen datos mas estrictos por asi decirlo
            localVue,
            vuetify,
            stubs: {
                EditStudent,
            },
            data() {
                return {
                    isEditModalOpen: false,
                    selectedStudent: null,
                    students: mockStudents,
                    total: 1,
                };
            },
        });
    });

    it('Inicialmente el modal debe estar cerrado', () => {
        expect(wrapper.vm.$data.isEditModalOpen).toBe(false);
    });

    it('Abre el modal al hacer clic en el botón de editar', async () => {
        // Buscar el botón de editar
        //Esperamos a que los datos se carguen
        await wrapper.setData({
            loading: false,
            students: mockStudents
        });
        await Vue.nextTick();

        const editButton = wrapper.find('button#btn-edit');
        expect(editButton.exists()).toBe(true);

        // Simular el clic
        await editButton.trigger('click');
        await Vue.nextTick();

        // Verificar que el modal se abrió
        expect(wrapper.vm.$data.isEditModalOpen).toBe(true);
        expect(wrapper.vm.$data.selectedStudent).toEqual(mockStudent);
    });

    it('Renderiza el componente de edición cuando el modal está abierto', async () => {
        await wrapper.setData({ isEditModalOpen: true, selectedStudent: mockStudent });
        const editStudentComponent = wrapper.findComponent(EditStudent) as Wrapper<EditStudentComponentType>; // para los compoenntes hijos se usa el type inserccion, no se usa el VueClass
        expect(editStudentComponent.exists()).toBe(true);
    });

    describe('Validación de campos', () => {
        let editStudentComponent: Wrapper<EditStudentComponentType>;


        beforeEach(async () => {
            await wrapper.setData({ isEditModalOpen: true, selectedStudent: mockStudent });
            editStudentComponent = wrapper.findComponent(EditStudent) as Wrapper<EditStudentComponentType>;
        });

        it('Valida el campo nombre', async () => {
            const input = editStudentComponent.find('input#firstName');
            await input.setValue('123Invalid!');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);
            expect(editStudentComponent.find('.v-messages__message').text())
                .toBe('No pueden contener números ni caracteres especiales.');

            await input.setValue('Karina');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);
        });

        it('Valida el campo apellido', async () => {
            const input = editStudentComponent.find('input#lastName');
            await input.setValue('Invalid@Name');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);
            expect(editStudentComponent.find('.v-messages__message').text())
                .toBe('No pueden contener números ni caracteres especiales.');

            await input.setValue('Medina');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);
        });

        it('valida el campo email', async () => {
            const input = editStudentComponent.find('input#email');
            await input.setValue('invalid-email');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);
            expect(editStudentComponent.find('.v-messages__message').text())
                .toBe('Debe ser un correo electrónico válido.');

            await input.setValue('yetsi.rofriguez@example.com');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);
        });

        it('valida el campo edad', async () => {
            const input = editStudentComponent.find('input#age');
            await input.setValue('3');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);
            expect(editStudentComponent.find('.v-messages__message').text())
                .toBe('La edad mínima es 4 años.');

            await input.setValue('25');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);
        });

        it('valida el campo teléfono', async () => {
            const input = editStudentComponent.find('input#phone');
            await input.setValue('04141234');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);
            expect(editStudentComponent.find('.v-messages__message').text())
                .toBe('Debe contener exactamente 11 dígitos, sin espacios ni guiones.');

            await input.setValue('04142345678');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);
        });
        //valida el campo genero
        it('muestra las opciones correctas de género', () => {
            const select = editStudentComponent.findComponent({ name: 'v-select' });
            expect(select.exists()).toBe(true);
            expect(select.props('items')).toEqual(['M', 'F', 'O']);
        });

        it('permite seleccionar un nuevo género', async () => {
            const select = editStudentComponent.findComponent({ name: 'v-select' });

            // Simular la selección de un nuevo valor
            await select.vm.$emit('input', 'F');
            await Vue.nextTick();

            expect(editStudentComponent.vm.formStudent.gender).toBe('F');
        });

        it('valida que se seleccione un género', async () => {
            const select = editStudentComponent.findComponent({ name: 'v-select' });

            // Simular un valor vacío
            await select.vm.$emit('input', '');
            await Vue.nextTick();

            const formRef = editStudentComponent.vm.$refs.form as Vue & { validate: () => boolean };
            expect(formRef.validate()).toBe(false);

            const errorMessage = editStudentComponent.find('.v-messages__message');
            expect(errorMessage.text()).toBe('Debe seleccionar un género.');

            // Cambiar el género
            await select.vm.$emit('input', 'F');
            await Vue.nextTick();
            expect(formRef.validate()).toBe(true);

        });
    });
    describe('Guardar cambios', () => {
        let editStudentComponent: Wrapper<EditStudentComponentType>;

        beforeEach(async () => {
            await wrapper.setData({ isEditModalOpen: true, selectedStudent: mockStudent });
            editStudentComponent = wrapper.findComponent(EditStudent) as Wrapper<EditStudentComponentType>;
        });

        it('guarda los cambios y cierra el modal', async () => {
            // Simular cambios en el formulario
            await editStudentComponent.setData({
                formStudent: {
                    ...mockStudent,
                    first_name: 'Karina',
                    email: 'yetsi.rodriguez@example.com',
                    gender: 'F',
                    phone: '04142345678'
                }
            });

            const saveButton = editStudentComponent.find('button#btn-save');
            await saveButton.trigger('click');

            expect(wrapper.vm.$data.isEditModalOpen).toBe(false);
            expect(wrapper.vm.$data.students[0]).toEqual({
                ...mockStudent,
                first_name: 'Karina',
                email: 'yetsi.rodriguez@example.com',
                gender: 'F',
                phone: '04142345678'
            });
        });
    });

    describe('Edición de estudiante en el listado', () => {
        it('actualiza correctamente el estudiante en el listado después de editar', async () => {
            // Seleccionar el primer estudiante y abrir el modal
            await wrapper.setData({
                selectedStudent: mockStudents[0],
                isEditModalOpen: true
            });
            await Vue.nextTick();

            // Verificar que el estudiante seleccionado es el correcto
            const editStudentComponent = wrapper.findComponent(EditStudent) as Wrapper<EditStudentComponentType>;
            expect(editStudentComponent.exists()).toBe(true);
            expect(editStudentComponent.props('selectedStudent')).toEqual(mockStudents[0]);

            // Datos actualizados del estudiante
            const updatedStudent = {
                ...mockStudents[0],
                first_name: 'Yetsimar Updated',
                last_name: 'Rodriguez Updated',
                email: 'yetsimar.updated@example.com',
                gender: 'F'
            };

            // Simular la edición del estudiante
            await editStudentComponent.setData({
                formStudent: updatedStudent
            });

            // Simular el guardado
            const saveButton = editStudentComponent.find('button#btn-save');
            await saveButton.trigger('click');
            await Vue.nextTick();

            // Verificar que el estudiante se actualizó en el listado
            const updatedStudentInList = wrapper.vm.students.find(
                (s: Student) => s.id === updatedStudent.id
            );
            expect(updatedStudentInList).toEqual(updatedStudent);

            // Verificar que el modal se cerró
            expect(wrapper.vm.isEditModalOpen).toBe(false);
            expect(wrapper.vm.selectedStudent).toBeNull();

            // Verificar que solo se actualizó el estudiante correcto
            expect(wrapper.vm.students[1]).toEqual(mockStudents[1]);
        });

        it('mantiene el resto de estudiantes sin cambios al editar uno', async () => {
            // Seleccionar y editar el primer estudiante
            await wrapper.setData({
                selectedStudent: mockStudents[0],
                isEditModalOpen: true
            });
            await Vue.nextTick();

            const editStudentComponent = wrapper.findComponent(EditStudent) as Wrapper<EditStudentComponentType>;
            const updatedStudent = {
                ...mockStudents[0],
                first_name: 'Yetsimar Modified'
            };

            await editStudentComponent.setData({
                formStudent: updatedStudent
            });

            const saveButton = editStudentComponent.find('button#btn-save');
            await saveButton.trigger('click');
            await Vue.nextTick();

            // Verificar que el segundo estudiante no cambió
            expect(wrapper.vm.students[1]).toEqual(mockStudents[1]);
            expect(wrapper.vm.students.length).toBe(mockStudents.length);
        });
    });
});