import Vue from 'vue'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Tab3 from '@/components/app/tabs/Tab3.vue'
import Vuetify from 'vuetify'
import Toast from "vue-toastification";
import { AppActionsType, Tab3Type } from '@/Interfaces/global'

const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)
Vue.use(Toast);

describe('Tab3.vue', () => {

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('note solo permite letras', async () => {
    const value = { note: "" }
    const wrapper = mount<Tab3Type>(Tab3, {
      localVue,
      vuetify,
      propsData: { value },
      stubs: {
        'v-row': true,
        'v-col': true,
        'v-text-fields': true,
      },
    })
    
    const input = wrapper.find('#note');
    await input.setValue('abc');
    expect((wrapper.vm as any).isValid).toBe(true);

    await input.setValue('123');
    expect((wrapper.vm as any).isValid).toBe(false);

    await input.setValue('abc123');
    expect((wrapper.vm as any).isValid).toBe(false);

    await input.setValue('ABC');
    expect((wrapper.vm as any).isValid).toBe(true);

    await input.setValue('#');
    expect((wrapper.vm as any).isValid).toBe(false);
  });
});
