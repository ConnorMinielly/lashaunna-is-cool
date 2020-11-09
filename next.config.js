const withTM = require('next-transpile-modules')([
  '@react-three/drei',
  'three',
  '@react-three/postprocessing',
]);

module.exports = withTM();
