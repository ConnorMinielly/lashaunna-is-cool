const withTM = require('next-transpile-modules')([
  '@react-three/drei',
  'three',
  '@react-three/postprocessing',
  'postprocessing',
]);

// is this working?
module.exports = withTM();
