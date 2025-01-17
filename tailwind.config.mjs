/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        superbubble: 'var(--font-superbubble)',
        tropicaltides: 'var(--font-tropicaltides)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
