module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,ico,png,jpg,html,js,txt,css}"
  ],
  "swDest": "build/sw.js",
  "swSrc": "src/sw.js",
  "injectionPoint": "const precacheManifest = [];"
};