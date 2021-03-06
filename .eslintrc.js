module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  parser: "@typescript-eslint/parser",
  rules: {
    eqeqeq: ["error", "always"],
    yoda: ["error", "never", { exceptRange: true }],
    "spaced-comment": [
      "error",
      "always",
      {
        line: { markers: ["/"] },
        block: { balanced: true },
      },
    ],
    "require-await": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "warn",
    "array-callback-return": ["error", { checkForEach: true }],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-var": "error",
    "no-use-before-define": "error",
    "no-constructor-return": "error",
    "no-self-compare": "error",
    "no-unreachable-loop": "error",
    "no-else-return": ["error", { allowElseIf: true }],
    "no-lonely-if": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
  },
};
