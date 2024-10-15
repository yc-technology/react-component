import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { ConfigEnv, UserConfigExport } from 'vite'
import { name } from './package.json'
// import prefixer from 'postcss-prefix-selector'
// import autoprefixer from 'autoprefixer'

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
    // css: {
    //   postcss: {
    //     plugins: [
    //       prefixer({
    //         prefix: '.yc',
    //         transform(prefix, selector, prefixedSelector, filePath, rule) {
    //           if (selector.match(/^(html|body)/)) {
    //             return selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
    //           }

    //           if (filePath.match(/node_modules/)) {
    //             return selector // Do not prefix styles imported from node_modules
    //           }

    //           const annotation = rule.prev()
    //           if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
    //             return selector // Do not prefix style rules that are preceded by: /* no-prefix */
    //           }

    //           return prefixedSelector
    //         }
    //       }),

    //       autoprefixer({})
    //     ]
    //   }
    // },
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
          'dayjs',
          // ...locales.map(({ path }) => path),
          'sonner',
          'lodash-es',
          'clsx',
          'cva',
          'react',
          'react-dom',
          'react-router-dom',
          'react-hook-form',
          'react/jsx-runtime',
          'framer-motion',
          '@hookform/resolvers/zod',
          '@yc-tech/shared',
          '@iconify/react',
          'tailwindcss',
          'tailwind-merge',
          'react-resizable-panels',
          'rc-picker',
          'rc-picker/lib/locale/zh_CN',
          'rc-picker/lib/locale/en_GB',
          'rc-image',
          'rc-select',
          'rc-table',
          'rc-animate',
          'rc-textarea',
          'rc-input',
          '@radix-ui/react-use-callback-ref',
          '@radix-ui/react-radio-group',
          '@radix-ui/react-tabs',
          '@radix-ui/react-scroll-area',
          '@radix-ui/react-select',
          '@radix-ui/react-tooltip',
          '@radix-ui/react-slot',
          '@radix-ui/react-icons',
          '@radix-ui/react-dialog',
          '@radix-ui/react-label',
          '@radix-ui/react-collapsible',
          '@floating-ui/react',
          '@radix-ui/react-alert-dialog',
          '@radix-ui/react-collapsible',
          '@radix-ui/react-checkbox',
          '@radix-ui/react-dropdown-menu',
          '@radix-ui/react-progress',
          '@radix-ui/react-popover',
          'moment',
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
