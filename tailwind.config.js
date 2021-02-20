module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'sb-blue': '#14213D',
        'sb-orange': '#FCA311',
        'sb-platinum': '#E5E5E5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
