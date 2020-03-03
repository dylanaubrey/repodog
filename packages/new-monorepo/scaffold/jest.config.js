const repodogConfig = require('@repodog/jest-config');

module.exports = {
  ...repodogConfig,
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/types.ts',
    '!**/*.test.*',
    '!**/__tests__/**',
    '!**/bin/**',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
  testMatch: ['<rootDir>/packages/**/*.test.*'],
};
