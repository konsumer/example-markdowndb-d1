This is a simple example that uses qwik & cloudflare-worker to make a very efficient CMS sort of thing.

I use qwik here, just for the simple router, but a similar technique could be used with any system (nextjs, some sort of api-endpoint, etc.)

You can do something similar with `import.meta.glob` to pull a list of markdown files, then render them all to markddown/frontmatter, but this uses [markdowndb](https://github.com/flowershow/markdowndb) for a simpler interface.

```sh
# install tools & dependencies
npm i

# run local dev-server
npm start

# run indexer, that will insert all the files in blog/ into the remote D1 database
npm run index
```
