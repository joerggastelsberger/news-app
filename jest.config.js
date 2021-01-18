module.exports = {
  globalSetup: "<rootDir>/jest.setup.js",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  'collectCoverage': true,
  'collectCoverageFrom': [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/middleware/**/*.js',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/plugins/date-filter.js',
    '<rootDir>/store/**/*.js',
    '<rootDir>/util/**/*.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/cypress/'
  ]
}