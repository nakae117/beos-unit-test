import { shallowMount } from '@vue/test-utils';
import StudentTable from '@/components/student/StudentTable.vue';

describe('StudentTable.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(StudentTable, {
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

  it('renders a skeleton loader when loading', () => {
    wrapper.setData({ loading: true });
    expect(wrapper.findComponent({ name: 'VSkeletonLoader' }).exists()).toBe(true);
  });

  it('renders student data when not loading', () => {
    wrapper.setData({
      loading: false,
      students: [
        { id: 1, first_name: 'John', last_name: 'Doe', age: 20 },
        { id: 2, first_name: 'Jane', last_name: 'Smith', age: 22 },
      ],
    });
    expect(wrapper.findAll('tbody tr').length).toBe(2);
  });

  it('updates search term correctly', () => {
    wrapper.setData({ search: 'John' });
    wrapper.vm.searchStudent();
    expect(wrapper.vm.options.search).toBe('John');
  });

  it('calls searchStudent method when search icon is clicked', async () => {
    wrapper.setData({ search: 'John' });
    wrapper.find('input').trigger('click:append');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.options.search).toBe('John');
  });
});
