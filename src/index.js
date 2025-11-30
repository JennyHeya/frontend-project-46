// src/index.js

import fs from 'fs'
import path from 'path'
import _ from 'lodash'

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8').trim()
}

const parse = (content, filepath) => {
  const ext = path.extname(filepath).toLowerCase()
  if (ext === '.json') {
    return JSON.parse(content)
  }
  throw new Error(`Unsupported file format: ${ext}`)
}

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  const lines = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (data1[key] !== data2[key]) {
      return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`].join('\n')
    }
    return `    ${key}: ${data1[key]}`
  })

  return ['{', ...lines, '}'].join('\n')
}

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const data1 = parse(content1, filepath1)
  const data2 = parse(content2, filepath2)

  return buildDiff(data1, data2)
}

export default genDiff