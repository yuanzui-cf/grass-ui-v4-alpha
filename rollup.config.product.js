import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import cssnanoPlugin from "cssnano";
import commonjs from "rollup-plugin-commonjs";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "./assets/script/main.ts",
    output: [
        {
            file: "./assets/dist/grassui.min.js",
            format: "umd",
            name: "GrassUI",
        },
        {
            file: "./assets/dist/grassui.es.min.js",
            format: "es",
        },
    ],
    plugins: [
        postcss({
            plugins: [cssnanoPlugin()],
            extract: "css/grassui.min.css",
        }),
        babel({
            exclude: "node_modules/**",
        }),
        commonjs(),
        terser(),
        nodeResolve(),
        typescript(),
    ],
};
