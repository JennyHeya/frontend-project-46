import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('stylish nested json', () => {
  const before = getFixturePath('nested1.json')
  const after = getFixturePath('nested2.json')
  const expected = readFileSync(getFixturePath('stylish_nested_result.txt'), 'utf-8').trim()
  expect(genDiff(before, after)).toBe(expected)
})

test('stylish nested yaml', () => {
  const before = getFixturePath('nested1.yml')
  const after = getFixturePath('nested2.yaml')
  const expected = readFileSync(getFixturePath('stylish_nested_result.txt'), 'utf-8').trim()
  expect(genDiff(before, after)).toBe(expected)
})
