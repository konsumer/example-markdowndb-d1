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

await mddb.init()

await mddb.indexFolder({
  folderPath: 'blog'
})

const blogs = await mddb.getFiles({
  folder: 'blog',
  extensions: ['md', 'mdx']
})

console.log(blogs)

// this is needed because getPlatformProxy holds it async
process.exit(0)
