import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/vue';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Vue from 'vue';
import Vuetify from 'vuetify';
import CreateSubject from '@/components/subject/CreateSubject.vue';
import SubjectTable from '@/components/subject/SubjectTable.vue';
import { server } from "@/mocks/server";
import Toast from 'vue-toastification';

Vue.use(Vuetify);
Vue.use(Toast);

describe('CreateSubject.vue', () => {
    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });
    afterAll(() => server.close());

    const renderComponent = () => {
        const vuetify = new Vuetify();
        return render(SubjectTable, {
            vuetify,
            stubs: {
                CreateSubject,
            },
            propsData: { value: false }
        });
    };


    it('if modal open when create subject is clicked', async () => {
        renderComponent();
        const createButton = await screen.findByRole('button', { name: /Crear Materia/ });
        await fireEvent.click(createButton);
        expect(screen.queryByRole('dialog')).toBeVisible();
    });

    it('if modal close when close button is clicked', async () => {
        renderComponent();
        const createButton = await screen.findByRole('button', { name: /Crear Materia/ });
        await fireEvent.click(createButton);
        waitFor(() => {
            expect(screen.queryByRole('dialog')).toBeVisible();
        });

        const closeButton = await screen.findByRole('button', { name: /Cerrar/ });
        await fireEvent.click(closeButton);
        waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeVisible();
        });
    });


    it("if data is saved successfully", async () => {
        renderComponent();
        const createSubjectBtn = await screen.findByRole('button', { name: /Crear Materia/ });
        await fireEvent.click(createSubjectBtn);

        await waitFor(() => expect(screen.queryByRole('dialog')).toBeVisible());

        const nameInput = screen.getByLabelText(/Nombre/);
        const codeInput = screen.getByLabelText(/Code/);
        const creditsInput = screen.getByLabelText(/Creditos/);
        const studentsInput = screen.getByLabelText(/Estudiantes Inscritos/);
        const modeSelect = screen.getByLabelText(/Modalidad/);

        const saveButton = screen.getByRole('button', { name: /Guardar/ });

        // Simular campos
        await fireEvent.update(modeSelect, "presencial");
        await fireEvent.update(nameInput, 'Matemáticas');
        await fireEvent.update(codeInput, 'I290');
        await fireEvent.update(creditsInput, '3');
        await fireEvent.update(studentsInput, '25');

        await fireEvent.click(saveButton);

        waitFor(() => {
            expect(screen.getByText(/Materia creada con éxito/)).toBeInTheDocument();
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

    });

    it('if fields are empty', async () => {
        renderComponent();
        const closeButton = await screen.findByRole('button', { name: /Crear Materia/ });
        await fireEvent.click(closeButton);

        const nameInput = screen.getByLabelText(/Nombre/);
        const codeInput = screen.getByLabelText(/Code/);
        const creditsInput = screen.getByLabelText(/Creditos/);
        const studentsInput = screen.getByLabelText(/Estudiantes Inscritos/);
        const modeSelect = screen.getByLabelText(/Modalidad/);
        const saveButton = screen.getByRole('button', { name: /Guardar/ });

        // Simular campos vacíos
        await fireEvent.update(nameInput, '');
        await fireEvent.update(codeInput, '');
        await fireEvent.update(creditsInput, '');
        await fireEvent.update(studentsInput, '');
        await fireEvent.update(modeSelect, '');

        // Simular clic en "Guardar"
        await fireEvent.click(saveButton);
        waitFor(() => {
            expect(screen.queryByText("Por favor, rellene los campos correctamente.")).toBeInTheDocument();
            const errorMessages = screen.getAllByText("Campo requerido.");
            expect(errorMessages.length).toBeGreaterThan(0);
            expect(screen.queryByRole('dialog')).toBeVisible();
        });
    });

});