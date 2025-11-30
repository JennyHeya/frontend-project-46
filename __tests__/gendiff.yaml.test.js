import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = (name) => join(__dirname, '..', '__fixtures__', name)

test('yaml diff', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(genDiff(filepath1, filepath2)).toBe(expected)
})
