import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import nesting from 'tailwindcss/nesting'
import { ConfigEnv, UserConfigExport } from 'vite'
import { name } from './package.json'
import prefixer from 'postcss-prefix-selector'
import autoprefixer from 'autoprefixer'

const localePaths = [
  { lang: 'zh_CN', path: '@douyinfe/semi-ui/lib/es/locale/source/zh_CN' },
  { lang: 'en_GB', path: '@douyinfe/semi-ui/lib/es/locale/source/en_GB' },
  { lang: 'en_US', path: '@douyinfe/semi-ui/lib/es/locale/source/en_US' },
  { lang: 'ko_KR', path: '@douyinfe/semi-ui/lib/es/locale/source/ko_KR' },
  { lang: 'ja_JP', path: '@douyinfe/semi-ui/lib/es/locale/source/ja_JP' },
  { lang: 'vi_VN', path: '@douyinfe/semi-ui/lib/es/locale/source/vi_VN' },
  { lang: 'ru_RU', path: '@douyinfe/semi-ui/lib/es/locale/source/ru_RU' },
  { lang: 'id_ID', path: '@douyinfe/semi-ui/lib/es/locale/source/id_ID' },
  { lang: 'ms_MY', path: '@douyinfe/semi-ui/lib/es/locale/source/ms_MY' },
  { lang: 'th_TH', path: '@douyinfe/semi-ui/lib/es/locale/source/th_TH' },
  { lang: 'tr_TR', path: '@douyinfe/semi-ui/lib/es/locale/source/tr_TR' },
  { lang: 'pt_BR', path: '@douyinfe/semi-ui/lib/es/locale/source/pt_BR' },
  { lang: 'zh_TW', path: '@douyinfe/semi-ui/lib/es/locale/source/zh_TW' },
  { lang: 'sv_SE', path: '@douyinfe/semi-ui/lib/es/locale/source/sv_SE' },
  { lang: 'pl_PL', path: '@douyinfe/semi-ui/lib/es/locale/source/pl_PL' },
  { lang: 'nl_NL', path: '@douyinfe/semi-ui/lib/es/locale/source/nl_NL' },
  { lang: 'ar', path: '@douyinfe/semi-ui/lib/es/locale/source/ar' },
  { lang: 'es', path: '@douyinfe/semi-ui/lib/es/locale/source/es' },
  { lang: 'it', path: '@douyinfe/semi-ui/lib/es/locale/source/it' },
  { lang: 'de', path: '@douyinfe/semi-ui/lib/es/locale/source/de' },
  { lang: 'fr', path: '@douyinfe/semi-ui/lib/es/locale/source/fr' },
  { lang: 'ro', path: '@douyinfe/semi-ui/lib/es/locale/source/ro' }
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
          nesting,
          tailwindcss,
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
          '@douyinfe/semi-ui',
          ...localePaths.map(({ path }) => path),
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
