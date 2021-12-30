module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
  },
};
