/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Finnish Flag & Nordic Colors
        'nordic': {
          'blue': '#003580',      // Deep Finnish blue
          'light-blue': '#0A5F9E', // Lighter blue
          'sky': '#E8F4F8',       // Ice blue background
          'white': '#FFFFFF',      // Pure white
          'snow': '#F8FAFB',      // Off-white snow
        },
        'finnish': {
          'forest': '#2D5016',     // Forest green
          'lake': '#0066B3',       // Lake blue
          'ice': '#B8D4E8',        // Ice blue
          'stone': '#626C73',      // Stone gray
          'midnight': '#00294D',   // Midnight blue
        },
        'neutral': {
          50: '#F8FAFB',
          100: '#F2F5F7',
          200: '#E5EAEE',
          300: '#CBD4DC',
          400: '#9BA8B4',
          500: '#626C73',
          600: '#4A5359',
          700: '#363D42',
          800: '#282D32',
          900: '#1C2024',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}