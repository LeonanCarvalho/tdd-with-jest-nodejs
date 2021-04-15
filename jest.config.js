
module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/database/**', '!src/server.js'],
  coverageDirectory: 'reports/coverage',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)'
  ],
};
