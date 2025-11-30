import fs from 'fs'
import path from 'path'
import _ from 'lodash'

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8').trim()
const parse = (data) => JSON.parse(data)

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(readFile(filepath1))
  const data2 = parse(readFile(filepath2))
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

export default genDiff
