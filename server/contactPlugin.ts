import type { Connect, Plugin } from 'vite'
import { handleContact } from './sendContact'

const MAX_BODY = 20_000

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0

    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('payload'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function attach(env: Record<string, string>): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path !== '/api/contact') return next()

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, error: 'Método no permitido.' }))
      return
    }

    try {
      const raw = await readBody(req)
      const result = await handleContact(raw ? JSON.parse(raw) : null, env)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    } catch {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, error: 'No se pudo leer el mensaje.' }))
    }
  }
}

export function contactApiPlugin(env: Record<string, string>): Plugin {
  const middleware = attach(env)
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
