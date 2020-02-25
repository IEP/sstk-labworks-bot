const fs = require('fs-extra')
const path = require('path')

/**
 * 
 * @param {string} file_path relative file path for dialog file
 */
const loadDialog = (file_path) => {
  return fs.readFileSync(path.join(__dirname, file_path), 'utf8')
}

module.exports = loadDialog