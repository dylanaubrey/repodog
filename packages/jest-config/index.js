const { consts, loadRepositoryConfig } = require('@repodog/config-helpers');

const { MONOREPO } = consts;

const singePackageConfig = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/types.ts', '!**/*.test.*', '!**/__test__/**'],
  testMatch: ['<rootDir>/src/**/*.test.*'],
};

const multiPackageConfig = {
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/types.ts',
    '!**/*.test.*',
    '!**/__test__/**',
    '!**/bin/**',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
  testMatch: ['<rootDir>/packages/**/*.test.*'],
};

const { features } = loadRepositoryConfig();

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/__snapshots__/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  ...(features.includes(MONOREPO) ? multiPackageConfig : singePackageConfig),
};
