import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F3EE',
          100: '#CCE7DD',
          200: '#99CFBB',
          300: '#66B799',
          400: '#339F77',
          500: '#007B4B',
          600: '#006F44',
          700: '#005334',
          800: '#003723',
          900: '#001B11',
        },
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

export default config
