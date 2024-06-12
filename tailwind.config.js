/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, rgba(100,116,139,1) 0%, rgba(51,65,85,1) 100%)',
      },
    },
  },
  plugins: [],
}

