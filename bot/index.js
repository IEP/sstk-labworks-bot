require('./core')
require('./db')
// const { knex, Models } = require('./db')
// const { Mahasiswa } = Models

// async function main() {
//   await Mahasiswa.query().delete()

//   await Mahasiswa.query().insert({
//     telegram_id: 123456,
//     email: 'ivan.ega.p@gmail.com'
//   })

//   const me = await Mahasiswa.query()

//   console.log(me)
// }

// main()
//   .then(() => knex.destroy())
//   .catch(err => {
//     console.error(err)
//     return knex.destroy()
//   })