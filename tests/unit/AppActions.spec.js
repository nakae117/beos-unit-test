import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('AppActions.vue', () => {
  // montar el vuetify para que pueda reconocer la etiquetas
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  // nido de pruebas deseadas

  // probando que el componente exista y que se le puedan pasar el bool de apertura
  // con el tipado correcto (props)
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
