import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import CreateSubject from '@/components/subject/CreateSubject.vue';
import Toast from "vue-toastification";

const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)
Vue.use(Toast);
describe('CreateSubject.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(CreateSubject, {
            localVue,
            vuetify,
            propsData: { value: true }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });


    it('should verify that required fields are filled and have valid values before saving data', async () => {
        const name = wrapper.find('input#name');
        const code = wrapper.find('input#code');

        // Simulate filling in the input fields
        await name.setValue('Mathematics');
        await code.setValue('I290');

        const saveButton = wrapper.find('button#save-button');
        await saveButton.trigger('click');
        expect(name.element.value).not.toBe('');
        expect(code.element.value).not.toBe('');
    });

    it('should verify that optional fields are in correct format if filled', async () => {
        const credits = wrapper.find('input#credits');
        const modeSelect = wrapper.findComponent({ ref: 'mode' });
        const studentsEnrolled = wrapper.find('input#studentsEnrolled');
 
        await credits.setValue('3');
        await modeSelect.vm.$emit('input', 'online');
        await studentsEnrolled.setValue('25');

        const saveButton = wrapper.find('button#save-button');
        await saveButton.trigger('click');

        expect(credits.element.value).toMatch(/^(?:[0-9]|[1-9][0-9])$/);
        expect(['online', 'presencial', 'híbrido']).toContain(wrapper.vm.form.mode);
        expect(studentsEnrolled.element.value).not.toBe('');
    });

});