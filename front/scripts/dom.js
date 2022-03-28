import { formatDistanceToNow } from 'date-fns'

const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>

  const currentPseudo = document.querySelector('#pseudo').value
  msgEl.classList.add(data.pseudo === currentPseudo ? 'own' : 'others')

  const pseudoSpan = document.createElement('span')
  pseudoSpan.classList.add('pseudo')
  pseudoSpan.textContent = data.pseudo

  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  const dateSpan = document.createElement('span')
  dateSpan.textContent = formatDistanceToNow(new Date(data.date), {
    addSuffix: true,
  })
  msgEl.append(dateSpan)
  dateSpan.classList.add('date')

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}
