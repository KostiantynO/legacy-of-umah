import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [typography],
};

export default tailwindConfig;
