/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        t1:'#8b8c89',
        t2:'#415a77',
        p1:'#0e0f18',
        p2:'#6096ba',
      }
    },
  },
  plugins: [],
}

