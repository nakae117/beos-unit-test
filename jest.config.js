module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: { 
    url: "http://localhost/", 
    customExportConditions: ["node", "node-addons"]
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  // setupFiles: ['./jest.environment.js'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',  // Para procesar archivos Vue
    '^.+\\.ts$': 'ts-jest',  // Para procesar archivos TypeScript
    '^.+\\.js$': 'babel-jest',
    // "^.+\\.tsx?$": "babel-jest",
    '^.+\\.tsx?$': ['ts-jest', { babelConfig: true}]
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
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
};