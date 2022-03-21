const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}
