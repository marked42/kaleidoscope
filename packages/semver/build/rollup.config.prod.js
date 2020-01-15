import config from './rollup.config'
// uglify only support ES5
// import { uglify } from 'rollup-plugin-uglify'
// terser ES6+
// import { terser } from 'rollup-plugin-terser'

// config.output.forEach(output => output.sourcemap = false)

config.plugins = [
  ...config.plugins,
  ...[
    // uglify(),
    // terser(),
  ]
]

export default config
