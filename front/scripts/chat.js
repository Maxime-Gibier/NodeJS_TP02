import { fetchAPI } from './api'
import { appendMessage } from './dom'

/**
 * @typedef {Object} data
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 * @property {Date} date - date of message publication
 */
function createItem(data) {
  localStorage.setItem('pseudo', data['pseudo'])
}

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)
  const error = document.querySelector('#error')
  if (data?.type === 'ERROR') {
    error?.classList.add('shown')
    error?.classList.remove('hidden')
    return
  }
  if (data?.type === 'NEW_MESSAGE') {
    error?.classList.add('hidden')
    error?.classList.remove('shown')
    appendMessage(data.payload)
  }
  createItem(data.payload)
}

const ws = new WebSocket('ws://127.0.0.1:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage

async function getHistory() {
  const messages = await fetchAPI('/chat/history')
  messages.forEach(appendMessage)
}
getHistory()

export function initChat() {
  /** @type {HTMLFormElement | null} */
  const messageForm = document.querySelector('#new-message')
  if (!messageForm) throw new Error('missing form')
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value

    if (!pseudo || !body) return

    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null
  })
  messageForm.pseudo.value = localStorage.getItem('pseudo')
}
