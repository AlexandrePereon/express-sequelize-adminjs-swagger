module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["standard-with-typescript", "prettier"],
    "plugins": ["prettier"],
    "ignorePatterns": ["node_modules/", "dist/",".eslintrc.js"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "no-console": "off",
        "no-param-reassign": "off",
        "consistent-return": "off",
        "linebreak-style": 0,
        "@typescript-eslint/no-non-null-assertion": "off",
    }
}
