const tailwindColors = require("./node_modules/tailwindcss/colors")
const colorSafeList = []

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = ["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray"]

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue
  }

  // Define all of your desired shades
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  const pallette = tailwindColors[colorName]

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
       // colorSafeList.push(`text-${colorName}-${shade}`)  <-- You can add different colored text as well 
        colorSafeList.push(`bg-${colorName}-${shade}`)
      }
    })
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: colorSafeList,                      // <-- add the safelist here
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [],
}