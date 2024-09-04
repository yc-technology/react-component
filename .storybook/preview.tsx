import type { Preview } from '@storybook/react'
import '../src/lib/styles/index.scss'
import '../src/lib/styles/preflight.css'
import '../src/lib/tailwind/theme.css'

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
  // render: (arg, ctx) => (
  //   <div className="p-4">
  //     <BrowserRouter basename="/">{ctx.storyFn(arg)}</BrowserRouter>
  //   </div>
  // )
}

export default preview
