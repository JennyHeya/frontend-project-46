import fs from 'fs'
import path from 'path'
import parse from './parsers.js'
import buildAst from './ast.js'
import getFormatter from './formatters/index.js'

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8')
const getExt = (filepath) => path.extname(filepath).toLowerCase()

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filepath1), getExt(filepath1))
  const data2 = parse(readFile(filepath2), getExt(filepath2))
  const ast = buildAst(data1, data2)
  const format = getFormatter(formatName)
  return format(ast)
}

export default genDiff
