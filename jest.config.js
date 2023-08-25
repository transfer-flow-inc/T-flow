module.exports = {
  verbose: false,
  maxWorkers: 6,
  transformIgnorePatterns: ['/node_modules/(?!(uuid|.*ol|.*quick-lru|.*akita|.*\\.mjs$))'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    "^.+\\.(ts|tsx)$": `ts-jest`
  },
  testPathIgnorePatterns: ['node_modules'],
  testMatch: ['(**/*.spec.ts)'],
  testRunner: 'jest-jasmine2',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/app/**/*.{js,ts}'
  ],
  clearMocks: true
}
