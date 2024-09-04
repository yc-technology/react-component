/** @type {import('tailwindcss').Config} */

import p from './tailwind.plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: (theme) => ({
        ...theme.colors
      })
    }
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animate'),
    process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? p() : []
  ]
}
