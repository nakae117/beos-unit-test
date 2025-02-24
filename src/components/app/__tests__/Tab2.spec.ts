import Vue from 'vue'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Tab2 from '@/components/app/tabs/Tab2.vue'
import Vuetify from 'vuetify'
import Toast from "vue-toastification";
import { AppActionsType, Tab2Type } from '@/Interfaces/global'


const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)
Vue.use(Toast);

describe('Tab2.vue', () => {

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Calcular una suma', async () => {
    console.log("=============== PRUEBA 2 ======================");
    const value = true
    const wrapper = mount<AppActionsType>(AppActions, {
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

    // Buscamos los campos nro1 y nro2
    expect(wrapper.findComponent(Tab2));
    const tab2Component = wrapper.findComponent(Tab2) as Wrapper<Tab2Type>;
    const nro1Field = tab2Component.find("#nro1");
    const nro2Field = tab2Component.find("#nro2");

    // Establecer valores en nro1 y nro2
    nro1Field.setValue("2");
    nro2Field.setValue("1");

    // Ejecutar la suma
    const sumButton = tab2Component.find("#sum-button");
    expect(sumButton.exists()).toBe(true);
    await sumButton.trigger("click");
    await wrapper.vm.$nextTick();

    // Verificar que el resultado sea correcto
    expect(tab2Component.vm.result).toBe(3);

    console.log("RESULT", tab2Component.vm.result);
  })
})
