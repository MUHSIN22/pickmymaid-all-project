// tailwind.config.js
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./srx/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          sm: "576px",
          md: "769px",
          lg: "992px",
          xl: "1200px",
          "2xl": "1445px",
        },
        fontFamily: {
          sans: ['Arial', 'Helvetica', 'sans-serif'],
        },
        colors: {
          white: "#FFFFFF",
          soft: {
            orange: "#FFE1E1",
            gray: "#F7F7F7",
          },
          primary: {
            50: "#ffebde",
            100: "#ffc8b0",
            200: "#ffa67f",
            300: "#FF7442",
            400: "#fe5f1c",
          },
          campaign: {
            200: "#FFE4DE",
            500: "#FF6F51",
          },
          black: {
            200: "#c0bfbf",
            300: "#a5a5a5",
            400: "#8b8b8b",
            500: "#727272",
            600: "#595959",
            700: "#354860",
            800: "#292525",
            900: "#150a0d",
          },
          blackRed: {
            100: "#3F1010",
          },
          semantic: {
            success: "#48BB78",
            failure: "#E53E3E",
          },
        },
      },
    },
    plugins: [],
  }
  