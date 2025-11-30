import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import parse from './parsers.js'

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8').trim()

const getExtension = (filepath) => path.extname(filepath)

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  const lines = keys.map((key) => {
    if (!_.has(data1, key)) return `  + ${key}: ${data2[key]}`
    if (!_.has(data2, key)) return `  - ${key}: ${data1[key]}`
    if (!_.isEqual(data1[key], data2[key])) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`
    }
    return `    ${key}: ${data1[key]}`
  })

  return ['{', ...lines, '}'].join('\n')
}

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)
  const ext1 = getExtension(filepath1)
  const ext2 = getExtension(filepath2)

  const data1 = parse(content1, ext1)
  const data2 = parse(content2, ext2)

  return buildDiff(data1, data2)
}

export default genDiff
