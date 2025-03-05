// import { mount } from "@vue/test-utils";
import { render, fireEvent, screen, waitFor, within } from '@testing-library/vue';
import '@testing-library/jest-dom';
import StudentTable from "@/components/student/StudentsTableTest.vue";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.use(Vuetify);

describe("Usuarios.vue", () => {
  let vuetify: Vuetify;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    vuetify = new Vuetify();

  });

    const renderComponent = () => {
          // const vuetify = new Vuetify();
          return render(StudentTable, {
              vuetify,
              // stubs: {
              //     EditStudent,
              // },
              // data() {
              //     return {
              //         isEditModalOpen: false,
              //         selectedStudent: null,
              //         students: mockStudents, //para evitar mutaciones globales
              //         total: 1,
              //         loading: false,
              //     };
              // },
          });
      };

  it("maneja errores de la API", async () => {
    renderComponent();

    server.use(
      http.get("/students", async () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

  });
});
