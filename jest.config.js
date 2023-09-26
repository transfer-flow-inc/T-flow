module.exports = {
  verbose: false,
  maxWorkers: 10,
  transformIgnorePatterns: ['/node_modules/(?!(uuid|.*ol|.*quick-lru|.*akita|.*\\.mjs$))'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['(**/*.spec.ts)'],
  testRunner: 'jest-jasmine2',
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage',
  coverageReporters: ["json", "lcov", 'text', 'text-summary'],
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/main.ts",
    "/src/polyfills.ts",
    "/src/environments/environment.ts",
    "/src/environments/environment.prod.ts",
    "/src/environments/environment.azure.ts",
    "/src/app/app-routing.module.ts",
    "/src/app/app.module.ts",
    ],
  collectCoverage: true,
  reporters: ['default',  ['jest-sonar', {
    outputName: 'test-report.xml',
  }]],
  clearMocks: true,
  silent: true,
}
