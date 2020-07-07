module.exports = {
  root: true,
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  ignorePatterns: ["node_modules", "out", "dist", "deno"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["prettier", "@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
}
