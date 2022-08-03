/** @format */

module.exports = {
   globDirectory: "dist/",
   globPatterns: ["**/*.{js,css,png,ico,svg,html,txt}"],
   swDest: "dist/service-worker.js",
   ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
