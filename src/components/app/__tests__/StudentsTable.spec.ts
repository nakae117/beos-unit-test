import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import StudentTable from '@/components/student/StudentTable.vue';

const localVue = createLocalVue();
Vue.use(Vuetify);

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { data: [], total: 0 } }),
}));

describe('StudentTable.vue', () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(StudentTable, {
      localVue,
      vuetify,
      data() {
        return {
          loading: false,
          students: [],
          search: '',
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

  it('renders a skeleton loader when loading', async () => {
    wrapper.setData({ loading: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'VSkeletonLoader' }).exists()).toBe(true);
  });

  /* it('renders student data when not loading', async () => {
    wrapper.setData({
      loading: false,
      students: [
        { id: 1, first_name: 'John', last_name: 'Doe', age: 20 },
        { id: 2, first_name: 'Jane', last_name: 'Smith', age: 22 },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('tbody tr').length).toBe(2);
  }); */

  it('updates search term correctly', () => {
    wrapper.setData({ search: 'John' });
    wrapper.vm.searchStudent();
    expect(wrapper.vm.options.search).toBe('John');
  });

  it('calls searchStudent method when search icon is clicked', async () => {
    const searchStudentSpy = jest.spyOn(wrapper.vm, 'searchStudent');

    wrapper.setData({ search: 'John' });
    await wrapper.vm.$nextTick();
    await wrapper.find('input').trigger('click:append');

    expect(searchStudentSpy).toHaveBeenCalled();
    expect(wrapper.vm.options.search).toBe('John');
  });
});
