/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        danger: '#FF4200',
        success: '#39820F',
        info: '#065CA3',
        warning: '#FFC700',
        primary: '#1A38D7',
        secondary: '#FF4200',
        accent: '#006175',
        'color-basic-100': '#FfFfFF',
        'color-basic-200': '#F8FAFF',
        'color-basic-300': '#F5F8FF',
        'color-basic-400': '#F3F6FF',
        'color-basic-500': '#EFF3FF',
        'color-basic-600': '#AEB8DB',
        'color-basic-700': '#7884B7',
        'color-basic-800': '#4C5893',
        'color-basic-900': '#2D397A',
        'color-basic-transparent-100': 'rgb(174, 184, 219, 0.08)',
        'color-basic-transparent-200': 'rgb(174, 184, 219, 0.16)',
        'color-basic-transparent-300': 'rgb(174, 184, 219, 0.24)',
        'color-basic-transparent-400': 'rgb(174, 184, 219, 0.32)',
        'color-basic-transparent-500': 'rgb(174, 184, 219, 0.4)',
        'color-basic-transparent-600': 'rgb(174, 184, 219, 0.48)',
        'color-primary-100': '#CBDFFC',
        'color-primary-200': '#98BCF9',
        'color-primary-300': '#6293EE',
        'color-primary-400': '#3B6FDE',
        'color-primary-500': '#053DC8',
        'color-primary-600': '#032FAC',
        'color-primary-700': '#022290',
        'color-primary-800': '#011874',
        'color-primary-900': '#001060',
        'color-success-100': '#E7F8CC',
        'color-success-200': '#CBF29C',
        'color-success-300': '#9ED966',
        'color-success-400': '#6FB43C',
        'color-success-500': '#39820F',
        'color-success-600': '#296F0A',
        'color-success-700': '#1C5D07',
        'color-success-800': '#114B04',
        'color-success-900': '#093E02',
        'color-info-100': '#CAEFFA',
        'color-info-200': '#97DAF5',
        'color-info-300': '#5FB6E3',
        'color-info-400': '#378EC7',
        'color-info-500': '#065CA3',
        'color-info-600': '#04478C',
        'color-info-700': '#033575',
        'color-info-800': '#01255E',
        'color-info-900': '#011A4E',
        'color-warning-100': '#FFF8CC',
        'color-warning-200': '#FFEF99',
        'color-warning-300': '#FFE466',
        'color-warning-400': '#FFD93F',
        'color-warning-500': '#FFC700',
        'color-warning-600': '#DBA600',
        'color-warning-700': '#B78600',
        'color-warning-800': '#936900',
        'color-warning-900': '#7A5400',
        'color-danger-100': '#FFE7CC',
        'color-danger-200': '#FFC899',
        'color-danger-300': '#FFA366',
        'color-danger-400': '#FF7E3F',
        'color-danger-500': '#FF4200',
        'color-danger-600': '#DB2900',
        'color-danger-700': '#B71500',
        'color-danger-800': '#930700',
        'color-danger-900': '#7A0002',
        'text-basic-color': '#000',
      },
      screens: {
        '3xl': '2000px',
        '4xl': '2400px',
        // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [],

  // Config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#ff4200',

          secondary: '#053dc8',

          accent: '#2155d7',

          neutral: '#3D4451',

          'base-100': '#FFFFFF',

          info: '#e0f2fe',

          success: '#dcfce7',

          warning: '#fef9c3',

          error: '#fee2e2',
        },
        screens: {
          sm: '425px',
          // => @media (min-width: 425px) { ... }

          md: '768px',
          // => @media (min-width: 768px) { ... }

          lg: '1024px',
          // => @media (min-width: 1024px) { ... }

          xl: '1100px',
          // => @media (min-width: 1100px) { ... }

          '2xl': '1440px',
          // => @media (min-width: 1440px) { ... }
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
