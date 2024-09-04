import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { ConfigEnv, UserConfigExport } from 'vite'
import { name } from './package.json'
import prefixer from 'postcss-prefix-selector'
import autoprefixer from 'autoprefixer'

const locales = [
  { lang: 'zh_CN', path: 'antd/locale/zh_CN' },
  { lang: 'en_GB', path: 'antd/locale/en_GB' },
  { lang: 'en_US', path: 'antd/locale/en_US' },
  { lang: 'ko_KR', path: 'antd/locale/ko_KR' },
  { lang: 'ja_JP', path: 'antd/locale/ja_JP' },
  { lang: 'vi_VN', path: 'antd/locale/vi_VN' },
  { lang: 'ru_RU', path: 'antd/locale/ru_RU' },
  { lang: 'id_ID', path: 'antd/locale/id_ID' },
  { lang: 'ms_MY', path: 'antd/locale/ms_MY' },
  { lang: 'th_TH', path: 'antd/locale/th_TH' },
  { lang: 'tr_TR', path: 'antd/locale/tr_TR' },
  { lang: 'pt_BR', path: 'antd/locale/pt_BR' },
  { lang: 'zh_TW', path: 'antd/locale/zh_TW' },
  { lang: 'sv_SE', path: 'antd/locale/sv_SE' },
  { lang: 'pl_PL', path: 'antd/locale/pl_PL' },
  { lang: 'nl_NL', path: 'antd/locale/nl_NL' },
  { lang: 'ar_EG', path: 'antd/locale/ar_EG' },
  { lang: 'es_ES', path: 'antd/locale/es_ES' },
  { lang: 'it_IT', path: 'antd/locale/it_IT' },
  { lang: 'de_DE', path: 'antd/locale/de_DE' },
  { lang: 'fr_FR', path: 'antd/locale/fr_FR' },
  { lang: 'ro_RO', path: 'antd/locale/ro_RO' }
]

const app = async ({ mode }: ConfigEnv): Promise<UserConfigExport> => {
  const isDev = mode === 'development'
  /**
   * Removes everything before the last
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name

  return defineConfig({
    resolve: {
      alias: [
        {
          find: /^~\//,
          replacement: `${path.resolve(__dirname, 'src')}/`
        }
      ]
    },
    plugins: [
      react(),
      dts({
        insertTypesEntry: true
      })
    ],
    css: {
      postcss: {
        plugins: [
          prefixer({
            prefix: '.yc',
            transform(prefix, selector, prefixedSelector, filePath, rule) {
              if (selector.match(/^(html|body)/)) {
                return selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
              }

              if (filePath.match(/node_modules/)) {
                return selector // Do not prefix styles imported from node_modules
              }

              const annotation = rule.prev()
              if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
                return selector // Do not prefix style rules that are preceded by: /* no-prefix */
              }

              return prefixedSelector
            }
          }),

          autoprefixer({})
        ]
      }
    },
    build: {
      watch: isDev ? {} : undefined,
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: (format) => `${formattedName}.${format}.js`
      },
      rollupOptions: {
        external: [
          'antd',
          ...locales.map(({ path }) => path),
          'react',
          'react/jsx-runtime',
          'react-dom',
          'tailwindcss',
          'cva',
          'tailwind-merge',
          'clsx',
          '@yc-tech/shared',
          '@iconify/react',
          'lodash-es',
          'rc-image',
          'framer-motion',
          '@hookform/resolvers/zod',
          'rc-select',
          'rc-table',
          'rc-animate',
          'rc-textarea',
          'rc-input',
          'sonner',
          '@radix-ui/react-tooltip',
          '@radix-ui/react-slot',
          '@radix-ui/react-icons',
          '@radix-ui/react-dialog',
          '@radix-ui/react-label',
          '@radix-ui/react-collapsible',
          '@floating-ui/react',
          'ahooks'
        ],
        output: {
          banner: `'use client';`,
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
            'tailwind-merge': 'tailwind-merge',
            clsx: 'clsx',
            tailwindcss: 'tailwindcss'
          }
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  })
}
// https://vitejs.dev/config/
export default app
