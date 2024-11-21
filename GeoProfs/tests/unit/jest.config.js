module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Verwijzing naar de src-map voor de @ alias
    },
    transform: {
      '^.+\\.vue$': 'vue-jest',      // Om .vue bestanden te verwerken
      '^.+\\.js$': 'babel-jest',     // Om ES6+ JavaScript bestanden te verwerken
    },
    testEnvironment: 'jsdom',         // Dit is belangrijk voor Vue-component tests
  };
  