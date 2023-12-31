/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'dark-mode',
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    //"./app/**/*.{js,ts,jsx,tsx}",
    // './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    // './src/layouts/*/.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',

    // Or if using `src` directory:
    //"./src/**/*.{html,js}",
    //"./node_modules/tw-elements/dist/js/**/*.js",
    //"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    //"./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins'],
      sohneBreit: ['--font-sohne-breit'],
    },
    extend: {
      dropShadow: {
        warningShadow: '0px 3px 3px rgba(236, 43, 112, 0.5)',
        blueShadow: '3px 4px 5px rgba(18, 220, 243, 0.2)',
        boxShadow: 'box-shadow: 0px 6px 24px 0px #24164D0D',
      },
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      blue: '#0EA5E9',
      primaryColor: '#32C4D4',
      primaryColorHover: '#279DAA',
      primaryColorPressed: '#20828D',
      primaryMidColor: '#538085',
      primaryExtraLightColor: '#E7FBFD',
      greyLight: '#F6F8F9',
      darkGrade25: '#E4EAEE',
      darkGrade50: '#A1B3C4',
      darkGrade60: '#8C9DAD',
      darkGrade75: '#525D67',
      darkGrade100: '#34404B',
      black: '#060529',
      bodyColor: '#F8FBFC',
      extraLightColor: '#EBEFF3',
      blueLightColor: '#D5F2F5',
      textSecondaryColor: '#5F666D',
      borderLightColor: '#DFDFE7',
      borderDarkColor: '#7B848D',
      warningColor: '#F67063',
      warningHoverColor: '#AF5046',
      warningBgColor: '#FEEAE8',
      layoutQuarteryColor: '#FCFCFC',
      greenBgColor: '#EBFBF1',
      greenDefault: '#52CF80',
      greenHover: '#40A063',
      greenPress: '#33814F',
      textTeriraryColor: '#A0A8AF',
      violetColor: '#7E20ED',
      violetLightColor: 'rgba(126, 31, 237, 0.1)',
      yellowColor: '#EECD5F',
      yellowHoverColor: '#B79D46',
      yellowBgColor: '#FDF7E5',
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
