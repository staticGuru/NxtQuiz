import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xxs: '380px',
      // => @media (min-width: 380px) { ... }
      xs: '600px',
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        nunito: ['var(--font-nunito)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-blue': '#1E7DFA',
        'custom-black': '#001847',
        'custom-blue-start': '#397CFF',
        'custom-blue-end': '#0F5EF7',
        primary: {
          blue: '#397CFF',
          gray: '#344054',
        },
        secondary: {
          blue: '#001847',
          gray: '#475467',
        },
        border: {
          gray: '#D0D5DD',
          lightGray: '#EAECF0',
        },
        'success-green': '#2CA851',
        'error-red': '#EF6F5E',
        'warning-yellow': '#FFA722',
      },
      boxShadow: {
        primaryShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        primaryShadowHover: '0px 0px 0px 2px #E2EBFD;',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.placeholder-transparent::placeholder': {
          color: 'transparent',
        },
        '.placeholder-focus-transparent:focus::placeholder': {
          color: 'transparent',
        },
      });
    },
  ],
};

export default config;
