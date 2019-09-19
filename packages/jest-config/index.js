module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/__snapshots__/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
