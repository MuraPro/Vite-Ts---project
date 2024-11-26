module.exports = {
  "*.{ts,tsx,js,jsx}": ["npm run fix", "npm run test:unit"],
  "*.css": ["npm run fix:css"],
  "src/**/*.{html,ts,tsx,js,jsx}": [
    "npm run build",
    "npm run sb",
    "npm run test:ui",
  ],
  "!**/.github/**": [],
  "!**/.husky/**": [],
};
