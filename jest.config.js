module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',  // Para procesar archivos Vue
    '^.+\\.ts$': 'ts-jest',  // Para procesar archivos TypeScript
    '^.+\\.js$': 'babel-jest',
    "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)' // Asegúrate de que Jest transpile axios
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Esto asegura que el alias @ funcione en Jest
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts', // Configura Vuetify y otros ajustes antes de las pruebas
    '<rootDir>/tests/setup.ts',
  ],
    globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  // setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
};
