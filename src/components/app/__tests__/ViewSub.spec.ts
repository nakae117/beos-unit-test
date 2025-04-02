import { render, fireEvent, screen, waitFor, cleanup, within } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Vue from 'vue';
import Vuetify from 'vuetify';
import SubjectTable from '@/components/subject/SubjectTable.vue';
import { server } from "@/mocks/server";
import { getSubjects } from "@/services/subject";
import { Subject } from '@/Interfaces/subjects';
import ViewSubject from '@/components/subject/ViewSubject.vue';
Vue.use(Vuetify);


describe('ViewSub.vue', () => {
    beforeAll(() => server.listen());
    afterEach(() => {
        cleanup();
        server.resetHandlers();
    });
    afterAll(() => server.close());
    let mockSubjects: Subject[];

    beforeEach(async () => {
        const subjects = await getSubjects();
        mockSubjects = subjects.data;
    });

    const renderComponent = () => {
        const vuetify = new Vuetify();
        return render(SubjectTable, {
            vuetify,
            stubs: {
                ViewSubject,
            },
        });
    };


    it('if modal open and closed', async () => {
        renderComponent();
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeGreaterThan(0);

        await waitFor(() => {
            expect(screen.getByText('online')).toBeInTheDocument();
        });

        const row = screen.getByText('online').closest('tr');
        const viewButton = within(row).getByTitle('View');
        await fireEvent.click(viewButton);
        const dialog = await screen.findByRole('dialog');

        waitFor(() => {
            expect(dialog).toBeInTheDocument();
        })

        const closeButton = screen.getByRole("button", { name: /Cerrar/ });
        await fireEvent.click(closeButton);

        waitFor(() => {
            expect(dialog).not.toBeInTheDocument();
        })
    });

    it('renders subject data when provided as prop', async () => {
        const vuetify = new Vuetify();
        const mockSubject: Subject = {
            name: 'Matemáticas',
            code: 'MATH101',
            credits: 3,
            mode: 'Presencial',
            studentsEnrolled: 25,
        };
        render(ViewSubject, {
            vuetify,
            props: {
                data: mockSubject,
                value: true,
            },
        });
        waitFor(() => {
            expect(screen.getByText('Nombre: Matemáticas')).toBeInTheDocument();
            expect(screen.getByText('Código: MATH101')).toBeInTheDocument();
            expect(screen.getByText('Créditos: 3')).toBeInTheDocument();
            expect(screen.getByText('Modo: Presencial')).toBeInTheDocument();
            expect(screen.getByText('Estudiantes Inscritos: 25')).toBeInTheDocument();
        });
    });
});