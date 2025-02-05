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
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Esto asegura que el alias @ funcione en Jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
};
