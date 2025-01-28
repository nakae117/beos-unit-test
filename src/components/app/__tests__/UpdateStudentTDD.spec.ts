import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import StudentEditModal from '@/components/student/UpdateStudent.vue';
import { Student } from '@/Interfaces/Student.interface';

const localVue = createLocalVue();
Vue.use(Vuetify);

describe('StudentEditModal.vue (TDD)', () => {
  let vuetify: Vuetify;
  
  const mockStudent: Student = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    age: '25',
    gender: 'M',
    degree: 'Licenciatura',
    phone: '04141234567'
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    const app = document.createElement('div');
    app.setAttribute('data-app', 'true');
    document.body.appendChild(app);
  });

  // 1.El modal debe existir y estar cerrado inicialmente
  it('El modal debe existir y estar cerrado inicialmente', () => {
    const wrapper = mount(StudentEditModal, {
      localVue,
      vuetify,
      propsData: {
        value: false,
        selectedStudent: mockStudent
      }
    });
    
    const dialog = wrapper.findComponent({ name: 'v-dialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('value')).toBe(false);
  });

  // 2.El modal debe mostrar el formulario con campos requeridos
  it('El modal debe mostrar el formulario con campos requeridos', () => {
    const wrapper = mount(StudentEditModal, {
      localVue,
      vuetify,
      propsData: {
        value: true,
        selectedStudent: mockStudent
      }
    });

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'age',
      'gender',
      'degree',
      'phone'
    ];

    requiredFields.forEach(field => {
      const input = wrapper.find(`#${field}`);
      expect(input.exists()).toBe(true);
    });
  });

  // 3. Validación del nombre
  describe('Validación del nombre', () => {
    it('Debe validar el formato del nombre', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const input = wrapper.find('#firstName');
      await input.setValue('John123');
      
      await Vue.nextTick();
      const errorMessage = wrapper.find('.v-messages__message');
      expect(errorMessage.text()).toBe('No pueden contener números ni caracteres especiales.');
      
      await input.setValue('John');
      await Vue.nextTick();
      expect(wrapper.find('.v-messages__message').exists()).toBe(false);
    });
  });

  // 4. Validación del email
  describe('Validación del email', () => {
    it('Debe validar el formato del email', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const input = wrapper.find('#email');
      await input.setValue('invalid-email');
      
      await Vue.nextTick();
      const errorMessage = wrapper.find('.v-messages__message');
      expect(errorMessage.text()).toBe('Debe ser un correo electrónico válido.');
      
      await input.setValue('valid@email.com');
      await Vue.nextTick();
      expect(wrapper.find('.v-messages__message').exists()).toBe(false);
    });
  });

  // 5. Validación de la edad
  describe('Validación de la edad', () => {
    it('should validate age range', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const input = wrapper.find('#age');
      await input.setValue('3');
      
      await Vue.nextTick();
      const errorMessage = wrapper.find('.v-messages__message');
      expect(errorMessage.text()).toBe('La edad mínima es 4 años.');
      
      await input.setValue('25');
      await Vue.nextTick();
      expect(wrapper.find('.v-messages__message').exists()).toBe(false);
    });
  });

  // 6. Select de género
  describe('Select de género', () => {
    it('Debería mostrar las opciones de género correctas', () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const select = wrapper.findAll('.v-select').at(0);
      const selectComponent = select.vm as any;
      expect(selectComponent.$props.items).toEqual(['M', 'F', 'O']);
    });

    it('Debe exigir la selección de género', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const select = wrapper.find('#gender');
      await select.setValue('');
      
      await Vue.nextTick();
      const errorMessage = wrapper.find('.v-messages__message');
      expect(errorMessage.text()).toBe('Debe seleccionar un género.');
    });
  });

  // 7.Guardar formulario
  describe('Guardar formulario', () => {
    it('Debe emitir un evento save con datos válidos', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const updatedStudent = {
        ...mockStudent,
        first_name: 'Jane',
        email: 'jane@example.com',
        gender: 'F'
      };

      await wrapper.setData({
        formStudent: updatedStudent
      });

      const saveButton = wrapper.find('#btn-save');
      await saveButton.trigger('click');

      expect(wrapper.emitted('save')).toBeTruthy();
      expect(wrapper.emitted('save')![0][0]).toEqual(updatedStudent);
    });

    it('No debe emitir eventos de guardado con datos no válidos', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      // Invalidar el formulario estableciendo un email incorrecto
      await wrapper.setData({
        formStudent: {
          ...mockStudent,
          email: 'invalid-email'
        }
      });

      const saveButton = wrapper.find('#btn-save');
      await saveButton.trigger('click');

      expect(wrapper.emitted('save')).toBeFalsy();
    });

    it('Debe emitir un evento de cierre cuando se pulse el botón de cancelación', async () => {
      const wrapper = mount(StudentEditModal, {
        localVue,
        vuetify,
        propsData: {
          value: true,
          selectedStudent: mockStudent
        }
      });

      const cancelButton = wrapper.find('#btn-cancel');
      await cancelButton.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });
});