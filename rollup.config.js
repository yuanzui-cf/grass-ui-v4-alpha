import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input: "./assets/script/main.js",
    output: [
        {
            file: "./assets/dist/grassui.js",
            format: "umd",
            name: "GrassUI",
        },
        {
            file: "./assets/dist/grassui.es.js",
            format: "es",
        },
    ],
    plugins: [
        postcss({
            extract: "css/grassui.css",
        }),
        babel({
            exclude: "node_modules/**",
        }),
        commonjs(),
        nodeResolve(),
    ],
};
