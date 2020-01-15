import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { resolveFile } from './utils'
import pkg from '../package.json'

export default {
  input: resolveFile('src/index'),
  output: [
    {
      format: 'cjs',
      file: resolveFile(pkg.main),
    },
    {
      format: 'esm',
      file: resolveFile(pkg.module),
    },
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
    json(),
  ],
}
