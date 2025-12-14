// this will list blog posts

import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return <div>HI</div>
})

export const head = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
