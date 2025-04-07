import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  preset: 'ts-jest/presets/default',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
  },
}

export default config
