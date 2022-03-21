import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import fastifyWS from 'fastify-websocket'

import { chatRoutes } from './routes/chat.js'

/**
 * @param { import('fastify').FastifyServerOptions } options
 */
export function build(options = {}) {
  const app = fastify(options)

  app.register(fastifyCors)
  app.register(fastifyWS)

  app.get('/', (request, reply) => {
    reply.send({ message: 'welcome on wsf realtime chat' })
  })

  app.register(chatRoutes, { prefix: '/chat' })

  return app
}
