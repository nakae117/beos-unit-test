import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Tab1 from '@/components/app/tabs/Tab1.vue'
import Vuetify from 'vuetify'
import Toast from "vue-toastification";

Vue.use(Vuetify)
Vue.use(Toast);

describe('AppActions.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Pasar al segundo Tab cuando se pisa el botón Next', () => {
    console.log("=============== PRUEBA 1 ======================");
    const value = true
    const wrapper = mount(AppActions, {
      localVue,
      vuetify,
      propsData: { value },
      stubs: {
        'v-dialog': true,
        'v-card': true,
        'v-toolbar': true,
        'v-spacer': true,
        'v-icon': true,
        'v-tabs': true,
        'v-tab': true,
        'v-tabs-items': true,
        'v-tab-item': true,
        'v-card-text': true,
        'v-card-actions': true,
        'v-row': true,
        'v-col': true,
      },
    })

    // Asegurarse de que estamos en el primer tab
    expect(wrapper.vm.tab).toBe('tab1');
    
    // Buscamos los campos name y description
    expect(wrapper.findComponent(Tab1));
    const tab1Component = wrapper.findComponent(Tab1);
    const nameField = tab1Component.find('#name');
    const descriptionField = tab1Component.find('#description');

    // Llenar los campos requeridos en Tab1
    nameField.setValue('Test Name');
    descriptionField.setValue('Test Descripcion');

    // Simular el seteo del formulario de Tab1 hacia AppActions
    tab1Component.vm.$emit('input', tab1Component.vm.data);

    // Buscamos el botón, y clickeamos
    const nextButton = wrapper.find('#next-button');
    expect(nextButton.exists()).toBe(true);
    nextButton.trigger('click');
    wrapper.vm.$nextTick();

    // Verificar que el tab haya cambiado
    expect(wrapper.vm.tab).toBe('tab2');

    console.log("TAB", wrapper.vm.tab);
})
})
