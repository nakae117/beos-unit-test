import { render, fireEvent, screen, waitFor, cleanup, within } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Vue from 'vue';
import Vuetify from 'vuetify';
import SubjectTable from '@/components/subject/SubjectTable.vue';
import { server } from "@/mocks/server";
import { getSubjects } from "@/services/subject";
import { Subject } from '@/Interfaces/subjects';
import Confirmation from "@/components/utils/Confirmation.vue";
Vue.use(Vuetify);


describe('DeleteSub.vue', () => {
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
        });
    };

    it("should open and delete each subject", async () => {
        renderComponent();
      
        const rows = await waitFor(() => screen.getAllByRole("row"));
        expect(rows.length).toBeGreaterThan(0);
      
        for (const row of rows) {
          const deleteButton = within(row).queryByTitle("Eliminar");
      
          if (!deleteButton) continue; 
      
          await fireEvent.click(deleteButton);
      
          await waitFor(() => {
            expect(screen.getByText("¿Estás seguro de que quieres eliminar esta materia?")).toBeInTheDocument();
          });
      
          const confirmButton = screen.getByRole("button", { name: "Confirm" });
          await fireEvent.click(confirmButton);
      
          await waitFor(() => {
            expect(
              screen.getByText("Materia eliminada con éxito")
            ).toBeInTheDocument();
          });
      
          await waitFor(() => {
            expect(row).not.toBeInTheDocument();
          });
        }
      });


});