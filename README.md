This is a simple example that uses qwik & cloudflare-worker to make a very efficient CMS sort of thing, from a directory of markdown files.

I use qwik here, just for the simple router, but a similar technique could be used with any system (nextjs, some sort of api-endpoint, etc.)

You could do something similar with `import.meta.glob` to pull a list of markdown files, then render them all to html/frontmatter, but I use [markdowndb](https://github.com/flowershow/markdowndb) for a simpler interface.

```sh
# install tools & dependencies
npm i

# run indexer, which will insert all the files in blog/ into the remote D1 database
npm run index

# run local dev-server
npm start

# deploy on cloudflare
npm run deploy
```

## TODO

- you have to index seperate from dev-server, but `mddb --watch` (in `npm-run-p`) could be used to live-update.
