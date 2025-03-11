import { server } from '@/mocks/server';

// Iniciar MSW antes de ejecutar las pruebas
beforeAll(() => server.listen());

// Resetear los handlers después de cada prueba
afterEach(() => server.resetHandlers());

// Cerrar el servidor MSW al finalizar las pruebas
afterAll(() => server.close());