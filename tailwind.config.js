module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.svelte"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
