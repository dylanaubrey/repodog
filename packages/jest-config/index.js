const { consts, loadRepositoryConfig } = require('@repodog/config-helpers');

const { MONOREPO } = consts;

const commonCollectCoverageFrom = [
  '!**/types.ts',
  '!**/types.ts',
  '!**/*.test.*',
  '!**/__test__/**',
  '!**/__TEST__/**',
  '!**/__mocks__/**',
  '!**/__MOCKS__/**',
];

const singePackageConfig = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', ...commonCollectCoverageFrom],
  testMatch: ['<rootDir>/src/**/*.test.*'],
};

const multiPackageConfig = {
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/bin/**',
    '!**/lib/**',
    '!**/node_modules/**',
    ...commonCollectCoverageFrom,
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
