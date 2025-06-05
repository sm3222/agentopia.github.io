// eslint.config.js
import globals from "globals";
import js from "@eslint/js"; // For ESLint's recommended rules
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // Integrates Prettier

export default [
  // 1. Base configuration for most JavaScript files (browser environment)
  {
    files: ["**/*.js", "**/*.mjs"], // Apply to .js and .mjs files
    ignores: [
        "node_modules/**",      // Standard practice: ignore node_modules
        "css/styles.css",       // This is a generated CSS file, not JS
        // Add any other specific files or directories you want ESLint to ignore
        // e.g., "vendor/**/*.js"
    ],
    languageOptions: {
      ecmaVersion: "latest", // Use modern JavaScript syntax
      sourceType: "module",   // Assume ES modules (import/export)
      globals: {
        ...globals.browser, // Define browser-specific global variables (window, document, etc.)
      },
    },
  },

  // 2. ESLint's recommended set of rules
  js.configs.recommended,

  // 3. Prettier integration
  // This does two things:
  //    - Uses eslint-config-prettier to turn off ESLint rules that would conflict with Prettier.
  //    - Adds the prettier/prettier rule, which runs Prettier as an ESLint rule (errors on formatting issues).
  eslintPluginPrettierRecommended,

  // 4. Specific configuration for Node.js scripts (like sync-agents.js)
  {
    files: ["js/sync-agents.cjs"], // Target your Node.js script(s)
    languageOptions: {
      globals: {
        ...globals.node, // Define Node.js-specific global variables (process, require, etc.)
      },
      // If sync-agents.js uses CommonJS (require/module.exports) uncomment the next line:
      sourceType: "commonjs",
    },
  },

  // 5. (Optional) Minimal custom rule overrides
  // If you find some default rules too strict, you can relax them here.
  // For example, to allow console.log statements:
  // {
  //   rules: {
  //     "no-console": "off",
  //   }
  // }
];
