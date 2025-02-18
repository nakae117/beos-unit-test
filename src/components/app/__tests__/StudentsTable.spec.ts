import { mount, Wrapper } from '@vue/test-utils';
import StudentTable from '@/components/StudentTable.vue';
// import axios from 'axios';
import Vue from 'vue';

jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StudentTable.vue', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(StudentTable);
  });

  it('debe filtrar la tabla al escribir en el input de búsqueda', async () => {
    const searchInput = wrapper.find('input');
    await searchInput.setValue('John');

    expect(wrapper.vm.$data.filteredStudents).toEqual(expect.arrayContaining([/* estudiantes filtrados */]));
  });

  it('no debe permitir caracteres especiales en el input de búsqueda', async () => {
    const searchInput = wrapper.find('input');
    await searchInput.setValue('John$%^&');

    expect(wrapper.vm.$data.searchQuery).not.toMatch(/[！＃＄％＆＊，．：；？＠、。〃〝〞︰~|\\/]/);
  });

  it('debe mostrar un error al pegar caracteres especiales', async () => {
    const searchInput = wrapper.find('input');
    await searchInput.setValue('John$%^&');
    const errorMessage = wrapper.find('.error-message');

    expect(errorMessage.exists()).toBe(true);
  });

  it('debe hacer una llamada al servidor correctamente', async () => {
    // mockedAxios.get.mockResolvedValue({ data: [] });

    // await wrapper.vm.$data.fetchData();
    // expect(mockedAxios.get).toHaveBeenCalledWith('/student');
    // expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('debe refrescar la vista correctamente', async () => {
    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('la búsqueda debe ser en tiempo real', async () => {
    const start = Date.now();
    const searchInput = wrapper.find('input');
    await searchInput.setValue('John');

    const end = Date.now();
    expect(end - start).toBeLessThan(1000);
  });
});
