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
          'antd',
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
