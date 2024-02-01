import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js', 
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'MyApp',
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
    commonjs(),
  ],
};

