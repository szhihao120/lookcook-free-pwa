import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist/**', 'coverage/**', 'public/data/**', 'public/covers/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: 'module' },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        Event: 'readonly'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off'
    }
  },
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        Event: 'readonly'
      }
    },
    rules: { '@typescript-eslint/no-explicit-any': 'off' }
  }
]
