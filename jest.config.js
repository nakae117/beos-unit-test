module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',  // Para procesar archivos Vue
    '^.+\\.ts$': 'ts-jest',  // Para procesar archivos TypeScript
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)' // Asegúrate de que Jest transpile axios
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Esto asegura que el alias @ funcione en Jest
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Configura Vuetify y otros ajustes antes de las pruebas
};