import Vue from 'vue';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/vue';
import StudentsTableTest from '@/components/student/StudentsTableTest.vue';
import '@testing-library/jest-dom';
import Vuetify from 'vuetify';
import Toast from 'vue-toastification';


// npm install --save-dev
  // @testing-library/vue
  // @testing-library/jest-dom
  // jest
  // vue-jest
  // ts-jest
  // @types/jest
  // @vue/test-utils

// npm install --save-dev @testing-library/vue@5
// npm install --save-dev @testing-library/jest-dom

let vuetify: Vuetify;

Vue.use(Vuetify);
Vue.use(Toast);

describe('ExampleComponent', () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    // Agregar el contenedor `data-app` al DOM
    const app = document.createElement('div');
    app.setAttribute('data-app', 'true');
    document.body.appendChild(app);
  });

  afterEach(() => {
    // Limpiar el DOM después de cada prueba
    document.body.innerHTML = '';
  });

  it('renders correctly', async () => {
    render(StudentsTableTest, {
      vuetify,
    });

    // Verificamos que se renderice la tabla correctamente
    expect(screen.getByText('Rendering Table')).toBeInTheDocument();

    // Buscamos la tabla por medio del title
    const table = screen.getByTitle('tableDelete');

    // Buscamos los botones que están dentro de la tabla
    // Usamos within para restringir la búsqueda unicamente en la tabla
    const buttonsFound = within(table).getAllByRole('button');
    
    // Buscamos el botón en la tabla que tenga de title = "Delete0"
    // Cero porque es el index del único estudiante que hay
    const deleteButton = buttonsFound.find(btn => 
      btn.getAttribute('title') === 'Delete0'
    );

    // Verificamos que el btn esté en el DOM
    expect(deleteButton).toBeInTheDocument();

    await waitFor(() => {
      // Simula el click en el botón de delete
      fireEvent.click(deleteButton);
    });

    // Verifica que el modal de confirmación esté visible
    const text = "Are you sure you want to delete David Williams, Email: david@gmail.com?";
    expect(screen.queryByText('Confirmation')).toBeInTheDocument();
    expect(screen.queryByText(text)).toBeInTheDocument();

    // Ahora buscamos el botón de confirmación que esta en el modal
    const confirmBtn = screen.getByTitle('confirm-btn');

    await waitFor(() => {
      // Simula el click en el botón de confirmación
      fireEvent.click(confirmBtn);
    });

    // Verificamos que el modal ya no esta preguntando por el texto del mismo
    expect(screen.queryByText('Confirmation')).not.toBeInTheDocument();

    console.log("=============== PRUEBA DELETE testing-library/vue ====================");
  });
});