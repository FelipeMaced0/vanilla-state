import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'main.js',
        external: ['lodash'],
        output: {
            file: 'dist/bundle.js',
            format: 'iife',
            name: 'VanillaState',
            globals: {
                lodash: '_'
            }
        },
        plugins: [
            nodeResolve(),
            commonjs({
                // Required for proper Lodash module resolution
                requireReturnsDefault: "auto"
            }),
            babel({
                babelHelpers: 'bundled',
                plugins: ['lodash']
            }),
        ]
    }
];