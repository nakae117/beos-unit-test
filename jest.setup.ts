import Vue from 'vue';
import Vuetify from 'vuetify';
import "@testing-library/jest-dom";

import { server } from './src/mocks/server';

Vue.use(Vuetify);

// Opcional: Silenciar warnings de Vue o Vuetify
Vue.config.silent = true;

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});