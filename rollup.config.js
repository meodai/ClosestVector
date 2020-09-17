import uglify from 'rollup-plugin-uglify';

export default {
  input: 'index.js',
  output: {
    file: 'index.umd.js',
    format: 'umd',
    name: 'Closest',
  },
  /*plugins: [
    uglify.uglify(),
  ],*/
};
