import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CreateStudent from '../CreateStudent.vue'

const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)

describe('CreateStudent.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(CreateStudent, {
      localVue,
      vuetify
    })
  })
/*El componente CreateStudent.vue debe tener una propiedad isModalOpen 
 que se establece en true cuando el modal se abre. */
  it('should open the modal when the "Crear Estudiante" button is clicked', async () => {
    const button = wrapper.find('button#create-button')
    await button.trigger('click')
    expect(wrapper.vm.isModalOpen).toBe(true)
  })

  it('should open the modal within 2 seconds of clicking the "Crear Estudiante" button', async () => {
    const button = wrapper.find('button#create-button')
    const startTime = Date.now()
    await button.trigger('click')
    const endTime = Date.now()
    expect(wrapper.vm.isModalOpen).toBe(true)
    expect(endTime - startTime).toBeLessThan(2000)
  })

    it('should verify that required fields are filled and have valid values before saving data', async () => { 
        const button = wrapper.find('button#save-button') 
       
        const identity = wrapper.find('input#identity') 
        const name = wrapper.find('input#name') 
        const lastName = wrapper.find('input#lastName') 
        const email = wrapper.find('input#email') 
        const grade = wrapper.find('input#grade') 

        await identity.setValue('V12345678') 
        await name.setValue('John') 
        await lastName.setValue('Doe')
        await email.setValue('john.doe@example.com') 
        await grade.setValue('Mathematics') 
        await button.trigger('click') 

        const saveButton = wrapper.find('button#save-button') 
        await saveButton.trigger('click') 

        expect(identity.element.value).not.toBe('')  
        expect(identity.element.value).toMatch(/^([VE])[0-9]{7,8}$/) 
        expect(name.element.value).not.toBe('')      
        expect(name.element.value).toMatch(/^[a-zA-Z\s]{1,32}$/) 
        expect(lastName.element.value).not.toBe('')      
        expect(lastName.element.value).toMatch(/^[a-zA-Z\s]{1,32}$/) 
        expect(email.element.value).not.toBe('')  
        expect(email.element.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
        expect(grade.element.value).not.toBe('')  
        expect(grade.element.value).toMatch(/^[a-zA-Z\s]+$/) 
        expect(wrapper.vm.isModalOpen).toBe(true) 
    })
    
    it('should verify that optional fields are in correct format if filled', async () => {
        const createButton = wrapper.find('button#create-button') 
        await createButton.trigger('click') 
        
        const address = wrapper.find('input#address') 
        const age = wrapper.find('input#age') 
        const gender = wrapper.find('select#gender') 
        const phone = wrapper.find('input#phone') 

        await address.setValue('123 Main St') 
        await age.setValue('12') 
        await gender.setValue('Masculino') 
        await phone.setValue('04141234567') 
        
        const saveButton = wrapper.find('button#save-button') 
        await saveButton.trigger('click') 
        
        // Validaciones de campos opcionales 
        expect(address.element.value.length).toBeLessThanOrEqual(50) 
        expect(age.element.value).toMatch(/^[0-9]{1,2}$/) 
        expect(parseInt(age.element.value)).toBeGreaterThanOrEqual(4) 
        expect(phone.element.value).toMatch(/^[0-9]{11}$/) 
    })
})
