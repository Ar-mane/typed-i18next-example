 module.exports = {
     setupFilesAfterEnv: ['./jest.setup.js'],
     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
     testEnvironment: "jsdom",
     moduleNameMapper: {
         "^~/(.*)$": "<rootDir>/$1"
     },
 };