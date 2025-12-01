import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const plain = (ast, path = '') => {
  const lines = ast.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${currentPath}' was removed`
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return plain(node.children, currentPath)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return lines.filter(Boolean).join('\n')
}

export default plain
