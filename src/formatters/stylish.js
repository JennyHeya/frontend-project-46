import _ from 'lodash'

const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth)
const bracketIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * (depth - 1))

const stringify = (value, depth = 1) => {
  if (!_.isPlainObject(value)) return String(value)
  const lines = Object.entries(value).map(([k, v]) => `${indent(depth + 1)}${k}: ${stringify(v, depth + 1)}`)
  return ['{', ...lines, `${indent(depth)}}`].join('\n')
}

const stylish = (ast, depth = 1) => {
  const lines = ast.map((node) => {
    const makeLine = (value, sign = ' ') => `${indent(depth).slice(0, -2)}${sign} ${node.key}: ${stringify(value, depth)}`

    switch (node.type) {
      case 'added': return makeLine(node.value, '+')
      case 'removed': return makeLine(node.value, '-')
      case 'changed': return [makeLine(node.oldValue, '-'), makeLine(node.newValue, '+')].join('\n')
      case 'unchanged': return makeLine(node.value)
      case 'nested': return `${indent(depth)}${node.key}: ${stylish(node.children, depth + 1)}`
      default: throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n')
}

export default stylish
