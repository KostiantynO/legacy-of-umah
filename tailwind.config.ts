// tailwind.config.ts
import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './lore/*.md',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        green: {
          50: '#E4F6E4',
          100: '#CEEFCE',
          200: '#B7E9B7',
          300: '#A1E2A1',
          400: '#6BDB6B',
          500: '#36D336',
          600: '#00CC00',
          700: '#00B500',
          800: '#009E00',
          900: '#007D00',
          950: '#005B00',
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default tailwindConfig;
