import dotenv from 'dotenv'

import { build } from './app.js'

dotenv.config()

async function start() {
  const app = build({
    logger: {
      level: 'info',
    },
  })

  try {
    await app.listen(process.env.PORT || 5000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
