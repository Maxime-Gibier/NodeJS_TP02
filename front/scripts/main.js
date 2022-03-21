import { fetchAPI } from './api.js'
import { initChat } from './chat.js'

async function main() {
  // fetch API simple demo
  const res = await fetchAPI('/')
  console.log(res)
}
main()

initChat()
