module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
  extends: [
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'sort-keys': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    '@typescript-eslint/comma-dangle': 'off',
  },
}
