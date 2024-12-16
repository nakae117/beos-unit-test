import Vue from 'vue'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Tab4 from '@/components/app/tabs/Tab4.vue'
import Vuetify from 'vuetify'
import Toast from "vue-toastification";
import { Tab4Type } from '@/Interfaces/global'

const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)
Vue.use(Toast);

describe('Tab4.vue', () => {

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Debería calcular la división correctamente', async () => {
      console.log("=============== PRUEBA 4 ======================");
      const value = true
    const wrapper = mount<Tab4Type>(Tab4, {
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

    // Buscar los campos nro1 y nro2
    expect(wrapper.findComponent(Tab4));
    const tab4Component = wrapper.findComponent(Tab4) as Wrapper<Tab4Type>;
    const nro1Field = wrapper.find("#nro1");
    const nro2Field = wrapper.find("#nro2");

    // Establecer valores en nro1 y nro2
    await nro1Field.setValue("10");
    await nro2Field.setValue("2");

    // Ejecutar la división
    const divButton = wrapper.find("#div-button");
     expect(divButton.exists()).toBe(true);
    await divButton.trigger("click");
    await wrapper.vm.$nextTick();

    // Verificar que el resultado sea correcto
    expect(tab4Component.vm.result).toBe(5);
  })

  it('Debería mostrar un mensaje de error si los números son <= 0', async () => {
    console.log("=============== PRUEBA 5 ======================");
    const wrapper = mount<Tab4Type>(Tab4, {
      localVue,
      vuetify,
    })

    const nro1Field = wrapper.find("#nro1");
    const nro2Field = wrapper.find("#nro2");

    // Establecer valores en nro1 y nro2 menores o iguales a 0
    await nro1Field.setValue("0");
    await nro2Field.setValue("2");

    const divButton = wrapper.find("#div-button");
    await divButton.trigger("click");
    await wrapper.vm.$nextTick();
// Esperar un poco para que el Toast se muestre
 await new Promise(resolve => setTimeout(resolve, 500));
 
    // Verificar que se haya mostrado un mensaje de error específico 
    const errorMessage = Array.from(document.body.querySelectorAll('.Vue-Toastification__toast--error')).some(toast => toast.textContent.includes('Numbers must be greater than 0'));
     expect(errorMessage).toBe(true); 
  })

  it('Debería mostrar un mensaje de error si falta alguno de los números', async () => {
      console.log("=============== PRUEBA 6 ======================");
    const wrapper = mount<Tab4Type>(Tab4, {
      localVue,
      vuetify,
    })

    const nro1Field = wrapper.find("#nro1");
    const nro2Field = wrapper.find("#nro2");

    // No establecer valores en nro1 y nro2
    await nro1Field.setValue("");
    await nro2Field.setValue("");

    const divButton = wrapper.find("#div-button");
    await divButton.trigger("click");
    await wrapper.vm.$nextTick();
// Esperar un poco para que el Toast se muestre
 await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar que se haya mostrado un mensaje de advertencia
      const errorMessage = Array.from(document.body.querySelectorAll('.Vue-Toastification__toast--error')).some(toast => toast.textContent.includes('You must add both numbers')); 
      expect(errorMessage).toBe(true); 
  })
})
