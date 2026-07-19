import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist/**', 'public/data/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parser: vueParser, parserOptions: { parser: tseslint.parser, sourceType: 'module' } },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off'
    }
  },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        fetch: 'readonly',
        structuredClone: 'readonly',
        FileReader: 'readonly',
        HTMLInputElement: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        document: 'readonly',
        Event: 'readonly'
      }
    }
  }
]
