module.exports = {
  content: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      textOpacity: ['dark'],
      colors: {
        // primary: '#F88100',
        // primaryfocus: '#F35B04',
        // secondary: '#FFB703',
        // tertiary: '#FAE445',
        // neutral: '#f8f8f8',

        // dark_primary: '#15202B',
        // dark_secondary: '#192734',
        // dark_tertiary: '#22303C',
      }
    },
  },
  plugins: [
    // require('daisyui'),
    // require("@tailwindcss/forms")({
    //     strategy: 'class',

    // }),
  ],
}
