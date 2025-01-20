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
/*Asegúrate de que tu componente CreateStudent.vue tenga una propiedad isModalOpen 
 que se establece en true cuando el modal se abre.
 Si esta propiedad no existe, deberás agregarla a tu componente. */
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
  /*  - Campos Requeridos:
        Cédula
        Nombre/Apellido
        Correo
        Curso Asignado o grado
 */

    it('should verify that required fields are filled and have valid values before saving data', async () => { 
        const button = wrapper.find('button#save-button') 
        // Asumiendo que tienes inputs con ids 'cedula', 'nombre', 'correo' y 'curso' 
        const cedula = wrapper.find('input#cedula') 
        const nombre = wrapper.find('input#nombre') 
        const correo = wrapper.find('input#correo') 
        const curso = wrapper.find('input#curso') 

        await cedula.setValue('V12345678') 
        await nombre.setValue('John Doe') 
        await correo.setValue('john.doe@example.com') 
        await curso.setValue('Mathematics') 
        await button.trigger('click') 

        const guardarButton = wrapper.find('button#guardar-button') 
        await guardarButton.trigger('click') 

        expect(cedula.element.value).not.toBe('')  
        expect(cedula.element.value).toMatch(/^([VE])[0-9]{7,8}$/) 
        expect(nombre.element.value).not.toBe('')      
        expect(nombre.element.value).toMatch(/^[a-zA-Z\s]{1,32}$/) 
        expect(correo.element.value).not.toBe('')  
        expect(correo.element.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
        expect(curso.element.value).not.toBe('')  
        expect(curso.element.value).toMatch(/^[a-zA-Z\s]+$/) 
        expect(wrapper.vm.isModalOpen).toBe(true) 
    })
    
    it('should verify that optional fields are in correct format if filled', async () => {
        const createButton = wrapper.find('button#create-button') 
        await createButton.trigger('click') 
        
        const direccion = wrapper.find('input#direccion') 
        const edad = wrapper.find('input#edad') 
        const genero = wrapper.find('select#genero') 
        const telefono = wrapper.find('input#telefono') 

        await direccion.setValue('123 Main St') 
        await edad.setValue('12') 
        await genero.setValue('Masculino') 
        await telefono.setValue('04141234567') 
        
        const guardarButton = wrapper.find('button#guardar-button') 
        await guardarButton.trigger('click') 
        
        // Validaciones de campos opcionales 
        expect(direccion.element.value.length).toBeLessThanOrEqual(50) 
        expect(edad.element.value).toMatch(/^[0-9]{1,2}$/) 
        expect(parseInt(edad.element.value)).toBeGreaterThanOrEqual(4) 
        expect(telefono.element.value).toMatch(/^[0-9]{11}$/) 
    })
})
