import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('AppActions.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Renders correctly', () => {
    const value = false
    const wrapper = mount(AppActions, {
      localVue,
      vuetify,
      propsData: { value }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
