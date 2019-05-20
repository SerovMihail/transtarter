module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                // bracketSpacing: true,
                printWidth: 100,
                semi: false,
                singleQuote: true,
                // trailingComma: 'all',
            },
        ],
        indent: ['error', 4],
        // "linebreak-style": ["error", "unix"],
        // "quotes": ["error", "double"],
        // "semi": ["error", "always"]
    },
    parserOptions: {
        parser: 'typescript-eslint-parser',
    },
}
