const px200 = Array.from({length: 200}, (_, i) => `${i}px`);

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: px200,
      colors: {
        pink: {
          200: '#FAE2E9',
          400: '#EC87A5',
          500: '#BF5C79',
          700: '#C63B64',
        },
        red: {
          300: '#FFB4B4',
          500: '#FF5F5F',
        },
        gray: {
          100: '#F8F8F8',
          200: '#E3E3E3',
          300: '#D8D8d8',
          500: '#8e8e8e',
          700: '#575757',
        },
        blue: {
          500: '#0D8AFF',
        },
        dark: {
          100: '#202124',
          200: '#3c4043',
          300: '#5e5e5e',
          500: '#8e8e8e',
          700: '#f8f8f8',
        },
        primary: '#C63B64',
      },
    },
  },
  plugins: [],
};
