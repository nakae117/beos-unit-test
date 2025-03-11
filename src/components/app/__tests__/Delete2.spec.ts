import Vue from 'vue';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Vuetify from 'vuetify';
import Toast from 'vue-toastification';
import { server } from '@/mocks/server';
import StudentTable from '@/components/student/StudentsTableTest.vue';
import Confirmation from "@/components/utils/Confirmation.vue";
import { Student } from '@/Interfaces/Student.interface';

Vue.use(Vuetify);
Vue.use(Toast);

describe('StudentsTableTest', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  let mockStudents: Student[];

  beforeEach(() => {
    const app = document.createElement('div');
    app.setAttribute('data-app', 'true');
    document.body.appendChild(app);
    mockStudents = [
      {
        id: 1,
        first_name: "David",
        last_name: "Williams",
        email: "david@gmail.com",
        age: "39",
        gender: "M",
        degree: "Dr.",
        phone: "+1 (910) 487-7111",
        created_at: "2025-01-10T13:38:50.000000Z",
        updated_at: "2025-01-10T13:38:50.000000Z",
      }
    ];
  });

  const renderComponent = () => {
    const vuetify = new Vuetify();
    return render(StudentTable, {
        vuetify,
        stubs: {
          Confirmation,
        },
        data() {
            return {
                confirmDelete: false,
                students: mockStudents,
                total: 1,
                isLoading: false,
            };
        },
    });
};

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Verify that table is rendered', async () => {
    renderComponent();
    expect(screen.getByText('Rendering Table')).toBeInTheDocument();
  })

  describe('Delete student correctly', () => {
    it('Click the delete button of the desired student', async () => {
      renderComponent();
      const table = screen.getByTitle('tableDelete');
      const buttonsFound = within(table).getAllByRole('button');
      const deleteButton = buttonsFound.find(btn => 
        btn.getAttribute('title') === 'Delete0'
      );

      expect(deleteButton).toBeInTheDocument();

      await waitFor(() => {
        fireEvent.click(deleteButton);
      });
    })

    it('Verify that the confirmation modal is visible', async () => {
      renderComponent();
      const table = screen.getByTitle('tableDelete');
      const buttonsFound = within(table).getAllByRole('button');
      const deleteButton = buttonsFound.find(btn => 
        btn.getAttribute('title') === 'Delete0'
      );

      expect(deleteButton).toBeInTheDocument();

      await waitFor(() => {
        fireEvent.click(deleteButton);
      });

      const text = "Are you sure you want to delete David Williams, Email: david@gmail.com?";
      expect(screen.queryByText('Confirmation')).toBeInTheDocument();
      expect(screen.queryByText(text)).toBeInTheDocument();
    })

    it('Confirm delete', async () => {
      renderComponent();
      const table = screen.getByTitle('tableDelete');
      const buttonsFound = within(table).getAllByRole('button');
      const deleteButton = buttonsFound.find(btn => 
        btn.getAttribute('title') === 'Delete0'
      );

      expect(deleteButton).toBeInTheDocument();

      await waitFor(() => {
        fireEvent.click(deleteButton);
      });

      const text = "Are you sure you want to delete David Williams, Email: david@gmail.com?";
      expect(screen.queryByText('Confirmation')).toBeInTheDocument();
      expect(screen.queryByText(text)).toBeInTheDocument();

      const confirmBtn = screen.getByTitle('confirm-btn');

      await waitFor(() => {
        fireEvent.click(confirmBtn);
        expect(screen.queryByText('Confirmation')).not.toBeInTheDocument();
      });
    })
  });
});