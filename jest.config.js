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
  testMatch: ['(**/*.spec.ts)'],
  testRunner: 'jest-jasmine2',
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage',
  coverageReporters: ["clover", "json", "lcov", "text", "text-summary"],
  collectCoverageFrom: [
    "src/**/*.ts"  // Adjust the pattern to match your project structure
  ],
  // exclude files from coverage
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/main.ts",
    "/src/polyfills.ts",
    "/src/environments/environment.ts",
    "/src/environments/environment.prod.ts",
    "/src/app/app-routing.module.ts",
    "/src/app/app.module.ts",
    "/src/app/app.component.ts",
    "/src/app/app.component.spec.ts",
    ],
  collectCoverage: true,
  testResultsProcessor: "jest-sonar-reporter",
  clearMocks: true

}
