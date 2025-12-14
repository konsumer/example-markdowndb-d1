// index markdown in blog/ and send to DB (D1 database)
// this might get replaced with improved general config for mddb

import { MarkdownDB } from 'mddb'
import ClientD1 from 'knex-cloudflare-d1'
import { getPlatformProxy } from 'wrangler'

// you can access CF env in scripts like this
const { env } = await getPlatformProxy()

// setup a MarkdownDB with CF D1
const mddb = new MarkdownDB({
  client: ClientD1,
  connection: {
    database: env.DB
  }
})

// test, that just uses sqlite file (for comparison)
// const mddb = new MarkdownDB({
//   client: 'sqlite3',
//   connection: {
//     filename: '.markdowndb/example.db'
//   }
// })

await mddb.init()

// here i am monkey-patching batchInsert to not use compound query, and also D1 does not support transactions
mddb.db.context.batchInsert = async (table, records = []) => {
  if (!Array.isArray(records)) {
    return []
  }
  return await Promise.all(records.map((chunk) => mddb.db(table).insert(chunk)))
}

await mddb.indexFolder({ folderPath: 'blog' })

const blogs = await mddb.getFiles()
console.log(blogs)

// this is needed because getPlatformProxy holds it async
process.exit(0)
