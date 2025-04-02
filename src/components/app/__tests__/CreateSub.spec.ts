import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import { postSubjects } from '@/services/subject';
import CreateSubject from '@/components/subject/CreateSubject.vue';
import Toast from "vue-toastification";

const localVue = createLocalVue()
let vuetify: Vuetify

Vue.use(Vuetify)
Vue.use(Toast);

jest.mock('@/services/subject', () => ({
    postSubjects: jest.fn().mockResolvedValue({ data: { success: true } }),
}));
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


    // it('verifying required fields', async () => {
    //     const name = wrapper.find('input#name');
    //     const credits = wrapper.find('input#credits');
    //     const modeSelect = wrapper.findComponent({ ref: 'mode' });
    //     const studentsEnrolled = wrapper.find('input#studentsEnrolled');
    //     const code = wrapper.find('input#code');
    //     await name.setValue('Math');
    //     await code.setValue('I290');
    //     await credits.setValue(Number(3));
    //     await studentsEnrolled.setValue(Number(25));
    //     await modeSelect.vm.$emit('input', 'online');


    //     expect(name.element.value).not.toBe('');
    //     expect(code.element.value).not.toBe('');
    //     expect(Number(credits.element.value)).not.toBeNaN();
    //     expect(modeSelect.vm.value).toBe('online');
    //     expect(Number(studentsEnrolled.element.value)).not.toBeNaN();
    // });

    it("should verify if modal closes", async () => {
        const close = wrapper.find('button#close-button');
        await close.trigger('click');
        expect(wrapper.emitted().input).toBeTruthy();
    });


    it("if data is saved successfully", async () => {
        const name = wrapper.find('input#name');
        const credits = wrapper.find('input#credits');
        const modeSelect = wrapper.findComponent({ ref: 'mode' });
        const studentsEnrolled = wrapper.find('input#studentsEnrolled');
        const code = wrapper.find('input#code');
        const saveButton = wrapper.find('button#save-button');

        await name.setValue('Math');
        await code.setValue('I290');
        await credits.setValue(3);
        await studentsEnrolled.setValue(25);
        await modeSelect.vm.$emit('input', 'online');

        expect(name.element.value).toBe('Math');
        expect(code.element.value).toBe('I290');
        expect(Number(credits.element.value)).toBe(3);
        expect(modeSelect.vm.value).toBe('online');
        expect(Number(studentsEnrolled.element.value)).toBe(25);

        await saveButton.trigger('click');

        expect(postSubjects).toHaveBeenCalledWith({
            name: name.element.value,
            code: code.element.value,
            credits: Number(credits.element.value),
            studentsEnrolled: Number(studentsEnrolled.element.value),
            mode: modeSelect.vm.value,
        });

        expect(wrapper.vm.form).toEqual({
            name: '',
            credits: 0,
            studentsEnrolled: 0,
            code: '',
            mode: '',
        });
        await wrapper.setProps({ value: false });
        expect(wrapper.vm.dialog).toBe(false);
    });

    it("if fields are empty", async () => {
        const name = wrapper.find('input#name');
        const credits = wrapper.find('input#credits');
        const modeSelect = wrapper.findComponent({ ref: 'mode' });
        const studentsEnrolled = wrapper.find('input#studentsEnrolled');
        const code = wrapper.find('input#code');
        const showToastSpy = jest.spyOn(wrapper.vm, 'showToast');

        await name.setValue('');
        await code.setValue('');
        await credits.setValue('');
        await studentsEnrolled.setValue('');
        await modeSelect.vm.$emit('input', '');

        const saveButton = wrapper.find('button#save-button');
        await saveButton.trigger('click');

        await Vue.nextTick();

        expect(wrapper.vm.dialog).toBe(true);
        expect(wrapper.vm.$refs.form.validate()).toBe(false);
        expect(showToastSpy).toHaveBeenCalledWith({
            title: "Error",
            message: "Por favor, rellene los campos correctamente."
        });
    });

});