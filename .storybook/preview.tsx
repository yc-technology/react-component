import type { Preview } from '@storybook/react'
import '../src/lib/tailwind/theme.css'
import '../src/lib/styles/preflight.css'
import '../src/lib/styles/index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
