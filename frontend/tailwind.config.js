module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F33",
        green: "#0F9D58",
        textDark: "#0A2540",
        muted: "#5B6B7C",
        brandBlue: "#2F5BEA",
        borderLight: "#E5E7EB",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      lineHeight: {
        tightHero: "1.15",
        relaxedText: "1.7",
      },
      spacing: {
        sectionY: "6.5rem",
        heroY: "7.5rem",
      },
    },
  },
  plugins: [],
};
