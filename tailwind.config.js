/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant dark neutral palette
        primary: "#0b0b0e", // warm near-black
        secondary: "#b5b0b8", // warm gray text
        tertiary: "#1a171b", // card background
        "black-100": "#141217",
        "black-200": "#0f0d11",
        "white-100": "#f3f3f3",
        accent: {
          gold: "#d4af37",
          rose: "#efb8c8",
          amber: "#f59e0b",
        },
      },
      boxShadow: {
        card: "0 30px 100px -20px rgba(20, 18, 23, 0.6)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.svg')",
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[600]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[100]'),
            '--tw-prose-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0%)',
            '--tw-prose-th-borders': theme('colors.gray[600]'),
            '--tw-prose-td-borders': theme('colors.gray[700]'),
            'pre': {
              'background-color': 'transparent !important',
              'border-radius': '0.5rem',
              'border': '1px solid rgb(255 255 255 / 0.1)',
              'padding': '1rem !important',
              'margin': '1.5rem 0 !important',
            },
            'code': {
              'background-color': 'rgb(0 0 0 / 0.2)',
              'border-radius': '0.25rem',
              'padding': '0.2em 0.4em',
              'font-size': '0.875em',
              'font-weight': '500',
            },
            'pre code': {
              'background-color': 'transparent',
              'border-radius': '0',
              'padding': '0',
              'font-size': '0.875em',
              'font-weight': '400',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
