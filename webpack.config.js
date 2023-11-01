import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { fileURLToPath } from 'url';
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webpackConfig = {
    target: "node",
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        // chunkFilename: "sourcemap",
        path: path.resolve(__dirname, "client"),
    },
    // devtool: "source-map",
    resolve: {
        alias: {
            '@root': __dirname,
            '@types': path.resolve(__dirname, 'types'),
            '@classes': path.resolve(__dirname, 'src', 'app-logic', 'classes'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@pages': path.resolve(__dirname, 'src', 'pages'),
            '@public': path.resolve(__dirname, 'src', 'public'),
        },
        extensions: ['.js', '.ts', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new VueLoaderPlugin(),
    ],
    devServer: {
        port: 3001,
    },
};

export default webpackConfig;
