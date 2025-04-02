import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
  within,
} from "@testing-library/vue";
import "@testing-library/jest-dom";
import Vue from "vue";
import Vuetify from "vuetify";
import SubjectTable from "@/components/subject/SubjectTable.vue";
import { server } from "@/mocks/server";
import { getSubjects, updateSubject } from "@/services/subject";
import { Subject } from "@/Interfaces/subjects";
import EditSubject from "@/components/subject/EditSubject.vue";
Vue.use(Vuetify);

describe("EditSub.vue", () => {
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
        EditSubject,
      },
    });
  };

  it("if modal open and closed", async () => {
    renderComponent();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText("online")).toBeInTheDocument();
    });

    const row = screen.getByText("online").closest("tr");
    const editButton = within(row).getByTitle("Editar");
    await fireEvent.click(editButton);

    const dialog = await screen.findByRole("dialog");

    waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /Cerrar/ });
    await fireEvent.click(closeButton);
    waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    });
  });

  it("should open and edit each subject", async () => {
    renderComponent();
  
    const rows = await waitFor(() => screen.getAllByRole("row"));
    expect(rows.length).toBeGreaterThan(0);
  
    for (const row of rows) {
      const editButton = within(row).queryByTitle("Editar");
  
      if (!editButton) continue; 
  
      await fireEvent.click(editButton);
  
      await waitFor(() => {
        expect(screen.getByText("Editar Materia")).toBeInTheDocument();
      });
  
      const saveButton = screen.getByRole("button", { name: "Guardar" });
      await fireEvent.click(saveButton);
  
      await waitFor(() => {
        expect(
          screen.getByText("Materia actualizada con éxito")
        ).toBeInTheDocument();
      });
  
      const closeButton = screen.getByRole("button", { name: "Cerrar" });
      await fireEvent.click(closeButton);
  
      await waitFor(() => {
        expect(screen.queryByText("Editar Materia")).not.toBeInTheDocument();
      });
    }
  });
  
  
});
