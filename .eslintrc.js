module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
         // note you must disable the base rule as it can report incorrect errors
        "quotes": "off",
        "@typescript-eslint/quotes": ["error", "single", { "allowTemplateLiterals": true }]
    }
}
