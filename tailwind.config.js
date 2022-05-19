module.exports = {
  content: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      // textOpacity: ['dark'],
      colors: {
        ligh_tprimary: "#0c8ce9",
        dark_primary: "#22A1EE",
        secondary: '#ff6b35',
        // tertiary: '#FAE445',
        // neutral: '#f8f8f8',

        dark_background: '#272727',
        bg_disable: '#464646',
        // dark_secondary: '#192734',
        // dark_tertiary: '#22303C',
        // text_disable: '#C4CDD4'
      },
      height: {
        '60px': '60px',
      },
      fontSize: {
        H1: '32px',
        H2: '24px',
        H3: '18px',
      }
    },
    screens: {
      'sm': '600px',
      'md': '960px',
      'lg': '1264px',
      'xl': '1904px',
    }
  },
  plugins: [
    // require('daisyui'),
    // require("@tailwindcss/forms")({
    //     strategy: 'class',

    // }),
  ],
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked', 'responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
      ringColor: ['responsive', 'dark', 'focus-within', 'focus', 'checked', 'active', 'hover'],
      ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus', 'checked', 'active', 'hover'],
      ringOffsetWidth: ['responsive', 'focus-within', 'focus', 'checked', 'active', 'hover'],
      ringOpacity: ['responsive', 'dark', 'focus-within', 'focus', 'checked', 'active', 'hover'],
      ringWidth: ['responsive', 'focus-within', 'focus', 'checked', 'active', 'hover'],
    }
  }
}
