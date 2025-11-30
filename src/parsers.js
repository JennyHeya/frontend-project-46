import yaml from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
}

const parse = (content, ext) => {
  const parser = parsers[ext.toLowerCase()]
  if (!parser) {
    throw new Error(`Unsupported file format: ${ext}`)
  }
  return parser(content)
}

export default parse
