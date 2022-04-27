import { randomUUID } from 'crypto'
import { ClientRequest } from 'http'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 * @property {Date} date - date of message publication
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */

function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    date: new Date(),
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  // /chat/
  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      if (data.body.length > 12) {
        connection.socket.send(
          JSON.stringify({ type: 'ERRORBODY', payload: 'Message trop long' }),
        )
        return
      }
      if (data.pseudo.length > 20) {
        connection.socket.send(
          JSON.stringify({ type: 'ERRORPSEUDO', payload: 'Pseudo trop long' }),
        )
        return
      }
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

  app.get('/history', (request, reply) => {
    reply.send(messages.slice(-30))
  })
}
