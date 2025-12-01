import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = (name) => join(__dirname, '..', '__fixtures__', name)

test('plain format', () => {
  const path1 = getFixturePath('nested1.json')
  const path2 = getFixturePath('nested2.json')
  const result = genDiff(path1, path2, 'plain')
  expect(result).toContain("Property 'common.follow' was added")
  expect(result).toContain("Property 'common.setting6.doge.wow' was updated")
  expect(result).toContain("Property 'group2' was removed")
})
