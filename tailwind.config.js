/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: '#3a061a',
          pink: '#9a375b',
          'coral-red': '#e6434c',
          'warm-sun': '#f7a36b',
          'navy-ocean': '#182137',
          'army-green': '#2f2b20',
          skin: '#88412c',
          sand: '#f6ddcd',
        },
        gray: {
          900: '#171619',
          800: '#241f1f',
          500: '#847369',
          400: '#9e918a',
          300: '#d0bfb1',
          200: '#e8ddd3',
          100: '#f2e9e2',
        }
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
