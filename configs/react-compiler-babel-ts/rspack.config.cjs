const { rspack } =  require('@rspack/core');

module.exports = {
    entry: {
        main: './src/index.tsx',
    },
    experiments: {
        css: true,
    },
    resolve: {
        extensions: ['...', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'builtin:swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                },
                                externalHelpers: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.[jt]sx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'builtin:swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                },
                                externalHelpers: true,
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                    }
                                }
                            }
                        }
                    },
                    {
                        loader: 'babel-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new rspack.HtmlRspackPlugin({
            template: './src/index.html',
        })
    ]
};
