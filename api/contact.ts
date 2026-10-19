import { handleContact } from '../server/sendContact'

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido.' })
  }

  const result = await handleContact(req.body)
  return res.status(result.status).json(result.body)
}
