import Vue from 'vue';
import { cleanup } from "@testing-library/vue";
import { createLocalVue, mount } from '@vue/test-utils';
import DetailsModal from '@/components/utils/DetailsModal.vue';
import StudentsTableTest from '@/components/student/StudentsTableTest.vue';
import Vuetify from 'vuetify';
import Toast from 'vue-toastification';
const localVue = createLocalVue();
let vuetify: Vuetify;

Vue.use(Vuetify);
Vue.use(Toast);


describe("DetailsModal.vue", () => {
    beforeEach(() => {
        vuetify = new Vuetify();
    });
    afterEach(cleanup)

    it('check if modal exists', (): void => {
        const wrapper = mount(StudentsTableTest, {
            localVue,
            vuetify,
        });

        const confirmationModal = wrapper.findComponent(DetailsModal);
        expect(confirmationModal.exists()).toBe(true);
    })

    it('check modal props', () => {
        const title = '';
        const width = '';
        const value = false;
        const data = {
            id: 2,
            first_name: "Anniel",
            last_name: "Reyes",
            email: "anniel@gmail.com",
            age: "20",
            gender: "M",
            degree: "Ing.",
            phone: "+1 (829) 452-5235",
            created_at: "2025-01-10T13:38:50.000000Z",
            updated_at: "2025-01-10T13:38:50.000000Z",
        };
        const wrapper = mount(DetailsModal, {
            propsData: { title, width, value, data }
        });
        expect(wrapper.props().title).toBe(title);
        expect(wrapper.props().width).toBe(width);
        expect(wrapper.props().value).toBe(value);
        expect(wrapper.props().data).toEqual(data);
    });

});