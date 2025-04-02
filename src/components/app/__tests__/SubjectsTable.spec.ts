import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import SubjectTable from '@/components/subject/SubjectTable.vue';
import { getSubjects } from "@/services/subject";
import {
    Subject,
} from "@/Interfaces/subjects";
const localVue = createLocalVue();
let vuetify: Vuetify;
Vue.use(Vuetify);

jest.mock('@/services/subject', () => ({
    getSubjects: jest.fn().mockResolvedValue({
        data: [
            { code: "MAT101", name: "Math", credits: 3, studentsEnrolled: 20, mode: "online" },
            { code: "PHY101", name: "Physics", credits: 4, studentsEnrolled: 15, mode: "presencial" },
            { code: "CHE101", name: "Chemistry", credits: 3, studentsEnrolled: 25, mode: "híbrido" }
        ] as Subject[], total: 3
    }),
}));

describe('SubjectTable.vue', () => {
    let wrapper;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(SubjectTable, {
            localVue,
            vuetify,
            data() {
                return {
                    students: [],
                    loading: false,
                    isOpenModal: false,
                    options: {
                        search: '',
                        page: 1,
                        sort_by: 'id',
                        sort_desc: 'asc',
                        per_page: 20,
                    },
                };
            },
        });
    });

    it('if render modal create subject', async () => {
        const modal = wrapper.findComponent({ name: 'v-dialog' });

        const button = wrapper.find('#create-button');
        await button.trigger('click');

        expect(wrapper.vm.isOpenModal).toBe(true);
        expect(modal.isVisible()).toBe(true);
    });

    describe('before data is loaded', () => {
        it('renders a loading', async () => {
            wrapper.setData({ loading: true });
            await Vue.nextTick();

            expect(wrapper.findComponent({ name: 'v-skeleton-loader' }).exists()).toBe(true);
            expect(wrapper.find('table').exists()).toBe(false);
        });
    });


    describe('after data is loaded', () => {
        it("render data", async () => {
            const data = await getSubjects();

            await wrapper.setData({
                subjects: data.data,
            });

            await Vue.nextTick();

            const rows = wrapper.findAll("tbody tr");
            expect(rows.length).toBe(3);

            rows.wrappers.forEach((row, index) => {
                const cells = row.findAll("td");
                expect(cells.length).toBe(6);

                expect(cells.at(0).text()).toBe(data.data[index].code);
                expect(cells.at(1).text()).toBe(data.data[index].name);
                expect(cells.at(2).text()).toBe(String(data.data[index].credits));
                expect(cells.at(3).text()).toBe(String(data.data[index].studentsEnrolled));
                expect(cells.at(4).text()).toBe(data.data[index].mode);
            });
        });

        // describe('if row is clicked', () => {
        //     it("shows modal", async () => {
        //         const row = wrapper.find('tbody tr');
        //         await row.trigger('click');

        //         expect(wrapper.vm.isOpenModal).toBe(true);
        //     });
        // });

        describe("pagination", () => {
            it("should verify if pagination is rendered", async () => {
                await wrapper.setData({
                    total: 100,
                    options: { ...wrapper.vm.options, per_page: 5, page: 1 }
                });
                await Vue.nextTick();

                const pagination = wrapper.find(".v-data-footer");
                expect(pagination.exists()).toBe(true);
            });
            it("should verify when next page is clicked", async () => {
                await wrapper.setData({
                    total: 100,
                    options: { ...wrapper.vm.options, page: 1, per_page: 5 }
                });
                await Vue.nextTick();

                const pagination = wrapper.find(".v-data-footer__icons-after");
                expect(pagination.exists()).toBe(true);

                const nextPageButton = pagination.find("button[aria-label='Next page']");
                expect(nextPageButton.exists()).toBe(true);
                expect(nextPageButton.attributes("disabled")).toBeUndefined();

                await nextPageButton.trigger("click");
                await Vue.nextTick();

                expect(wrapper.vm.options.page).toBe(2);
            });
            it("should verify when previous page is clicked", async () => {
                await wrapper.setData({
                    total: 100,
                    options: { ...wrapper.vm.options, page: 2, per_page: 5 }
                });
                await Vue.nextTick();

                const pagination = wrapper.find(".v-data-footer__icons-before");
                expect(pagination.exists()).toBe(true);

                const prevPageButton = pagination.find("button[aria-label='Previous page']");
                expect(prevPageButton.exists()).toBe(true);
                expect(prevPageButton.attributes("disabled")).toBeUndefined();

                await prevPageButton.trigger("click");
                await Vue.nextTick();

                expect(wrapper.vm.options.page).toBe(1);
            });
        })
        describe("actions", () => {
            it("should verify if actions are rendered", async () => {

                const rows = wrapper.findAll("tbody tr");
                expect(rows.length).toBe(3);

                rows.wrappers.forEach((row) => {
                    const actionButtons = row.findAll("button");

                    expect(actionButtons.length).toBe(3);

                    const visibilityButton = row.find("#visibility");
                    const editButton = row.find("#edit");
                    const deleteButton = row.find("#delete");

                    expect(visibilityButton.exists()).toBe(true);
                    expect(editButton.exists()).toBe(true);
                    expect(deleteButton.exists()).toBe(true);

                });
            });
        });
        // it("renders an error alert", () => {});
        // });

    });
});