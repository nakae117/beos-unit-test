import Vue from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';
import StudentsTableTest from '@/components/student/StudentsTableTest.vue';
import ConfirmationModal from '@/components/utils/Confirmation.vue';
import Vuetify from 'vuetify';
import Toast from 'vue-toastification';
import { StudentTable } from '@/Interfaces/students-table';

const localVue = createLocalVue();
let vuetify: Vuetify;

Vue.use(Vuetify);
Vue.use(Toast);

describe("StudentsTableTest.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    // Agregar el contenedor `data-app` al DOM
    const app = document.createElement('div');
    app.setAttribute('data-app', 'true');
    document.body.appendChild(app);
  });

  afterEach(() => {
    // Limpiar el DOM después de cada prueba
    document.body.innerHTML = '';
  });

  it("delete a student correctly", async () => {
    const wrapper = mount<StudentTable>(StudentsTableTest, {
      localVue,
      vuetify,
    });

    // Definimos el objeto item
    const item = {
      id: 1,
      first_name: "David",
      last_name: "Williams",
      email: "david@gmail.com",
      age: "39",
      gender: "M",
      degree: "Dr.",
      phone: "+1 (910) 487-7111",
      created_at: "2025-01-10T13:38:50.000000Z",
      updated_at: "2025-01-10T13:38:50.000000Z"
    };

    // Llamamos explícitamente al método setInfoDelete
    wrapper.vm.setInfoDelete(item);

    await wrapper.vm.$nextTick();

    // Buscamos el componente ConfirmationModal y verificamos que exista
    const confirmationModal = wrapper.findComponent(ConfirmationModal);
    expect(confirmationModal.exists()).toBe(true);

    await wrapper.vm.$nextTick();

    // Verificamos que las variables tengan los valores correctos
    expect(wrapper.vm.title).toBe("Confirmation");
    expect(wrapper.vm.message).toBe(
      "Are you sure you want to delete David Williams, Email: david@gmail.com?"
    );

    // Trigger de la acción
    const actionBtn = confirmationModal.find('#confirm-btn');
    expect(actionBtn.exists()).toBe(true);
    actionBtn.trigger('click');

    await wrapper.vm.$nextTick();

    // Verificar cambios
    expect(wrapper.vm.confirmDelete).toBe(false);

    console.log("=============== PRUEBA DELETE vue/test-utils ====================");
  });
});