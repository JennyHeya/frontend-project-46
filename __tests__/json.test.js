import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('json formatter returns valid JSON string', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const jsonOutput = genDiff(file1, file2, 'json')
  expect(() => JSON.parse(jsonOutput)).not.toThrow()
  const data = JSON.parse(jsonOutput)
  expect(Array.isArray(data)).toBe(true)
  const types = data.map((item) => item.type)
  expect(types).toContain('added')
  expect(types).toContain('removed')
  expect(types).toContain('unchanged')
  expect(types).toContain('changed')
})

test('json formatter with nested files', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const jsonOutput = genDiff(file1, file2, 'json')
  expect(() => JSON.parse(jsonOutput)).not.toThrow()
})
