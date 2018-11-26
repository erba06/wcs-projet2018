module.exports = {
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
    modules: true
  },
  env: {
    browser: true,
    commonjs: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  plugins: ['react']
}
