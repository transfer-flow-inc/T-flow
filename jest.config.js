module.exports = {
  verbose: false,
  maxWorkers: 6,
  transformIgnorePatterns: ['/node_modules/(?!(uuid|.*ol|.*quick-lru|.*akita|.*\\.mjs$))'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    "^.+\\.(ts|tsx)$": ['ts-jest', {
      /* ts-jest config goes here in Jest */

    }]
  },
  testPathIgnorePatterns: ['node_modules'],
  testMatch: ['(**/*.spec.ts)'],
  testRunner: 'jest-jasmine2',
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage',
  coverageReporters: ["clover", "json", "lcov", "text", "text-summary"],
  collectCoverage: true,
  testResultsProcessor: "jest-sonar-reporter",
  clearMocks: true

}
