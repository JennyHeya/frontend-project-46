// src/formatters/json.js
const jsonFormatter = (diffTree) => JSON.stringify(diffTree, null, 2)

export default jsonFormatter