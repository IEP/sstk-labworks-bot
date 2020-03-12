const fs = require('fs-extra')
const path = require('path')

// Use dialog for long message, no template literal in dialog file is
// supported

/**
 * loadDialog bot dialog loader
 * @param {string} file_path relative file path for dialog file
 */
const loadDialog = (file_path) => {
  return fs.readFileSync(path.join(__dirname, file_path), 'utf8')
}

module.exports = loadDialog
