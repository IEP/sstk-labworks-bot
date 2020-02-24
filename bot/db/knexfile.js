// Update with your config settings.
const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, 'development.sqlite3')
    },
    pool: {
      afterCreate: (conn, callback) => {
        conn.run('PRAGMA foreign_keys = ON', callback)
      }
    }
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, 'db.sqlite3')
    },
    pool: {
      afterCreate: (conn, callback) => {
        conn.run('PRAGMA foreign_keys = ON', callback)
      }
    }
  }
}

