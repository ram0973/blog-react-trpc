import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginNode from 'eslint-plugin-node' // Добавляем плагин для Node.js

export default defineConfig([
  {
    ignores: ['dist/**', '**/dist/**', 'node_modules/**', '**/*.d.ts', 'webapp/vite.config.ts']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js, // Плагин из @eslint/js
      node: pluginNode // Добавляем плагин для Node.js
    },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly'
      }
    },
  },
  {
    rules: {
      'curly': ['error', 'all'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@ideanick/backend/**', '!@ideanick/backend/**/', '!@ideanick/backend/**/input'],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
      'node/no-process-env': 'error' // Исправлено: строка 'error' вместо переменной error
    },
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Конфиг специфичный для Node.js файлов
  {
    files: ['**/*.{js,cjs,mjs}'],
    plugins: {
      node: pluginNode
    },
    rules: {
      'node/no-unpublished-require': 'error',
      'node/no-missing-require': 'error'
    }
  }
])
