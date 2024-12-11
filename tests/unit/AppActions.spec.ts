import Vue from 'vue'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import AppActions from '@/components/app/AppActions.vue'
import Vuetify from 'vuetify'

// Tipar localVue y vuetify
  // montar el vuetify para que pueda reconocer la etiquetas
const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)

describe('AppActions.vue', () => {


  beforeEach(() => {
    vuetify = new Vuetify()
  })

  // nido de pruebas deseadas

  // probando que el componente exista y que se le puedan pasar el bool de apertura
  // con el tipado correcto (props)
  it('Renders correctly', () => {
    const value = false
    const wrapper: Wrapper<Vue> = mount(AppActions, { // Se usa el  Wrapper<Vue> si No necesitas tipado específico del componente
      localVue,
      vuetify,
      propsData: { value }
    })
    
    expect(wrapper.exists()).toBe(true)
  })
})
