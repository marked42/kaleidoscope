import serve from 'rollup-plugin-serve'
import config from './rollup.config'
import { resolveFile } from './utils'

config.output.forEach(output => output.sourcemap = true)

const PORT = 3000

config.plugins = [
  ...config.plugins,
  ...[
    serve({
      port: PORT,
      contentBase: [
        resolveFile('example'),
        resolveFile('dist'),
      ]
    })
  ]
]

export default config
