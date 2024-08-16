import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import path from 'node:path'
const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: /^~\//,
          replacement: `${path.resolve(__dirname, '../src')}/`
        }
      ]
    },
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss]
      }
    }
  })
}
// https://vitejs.dev/config/
export default app
