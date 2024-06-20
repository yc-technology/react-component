import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { ConfigEnv, UserConfigExport } from 'vite'
import { name } from './package.json'

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
        plugins: [tailwindcss]
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
          'class-variance-authority',
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
            'class-variance-authority': 'class-variance-authority',
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
