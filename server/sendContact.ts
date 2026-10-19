import { createTransport } from 'nodemailer'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResult = {
  status: number
  body: { ok: boolean; error?: string }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(raw: unknown): ContactPayload | string {
  if (!raw || typeof raw !== 'object') return 'Datos inválidos.'
  const { name, email, message } = raw as Record<string, unknown>

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
    return 'Escribe un nombre válido.'
  }
  if (typeof email !== 'string' || email.length > 120 || !EMAIL_RE.test(email.trim())) {
    return 'Escribe un email válido.'
  }
  if (
    typeof message !== 'string' ||
    message.trim().length < 8 ||
    message.trim().length > 4000
  ) {
    return 'El mensaje es demasiado corto.'
  }

  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  }
}

export async function handleContact(
  raw: unknown,
  env: Record<string, string | undefined> = process.env,
): Promise<ContactResult> {
  const user = env.GMAIL_USER?.trim()
  const pass = env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')
  const to = (env.MAIL_TO || env.GMAIL_USER)?.trim()

  if (!user || !to) {
    return {
      status: 503,
      body: { ok: false, error: 'Falta GMAIL_USER en .env.local.' },
    }
  }

  if (!pass) {
    return {
      status: 503,
      body: {
        ok: false,
        error:
          'Falta GMAIL_APP_PASSWORD en .env.local. Usa una contraseña de aplicación de Google.',
      },
    }
  }

  const parsed = validateContact(raw)
  if (typeof parsed === 'string') {
    return { status: 400, body: { ok: false, error: parsed } }
  }

  try {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"MyBucket" <${user}>`,
      to,
      replyTo: `"${parsed.name}" <${parsed.email}>`,
      subject: `Contacto desde MyBucket — ${parsed.name}`,
      text: `${parsed.message}\n\n— ${parsed.name}\n${parsed.email}`,
    })

    return { status: 200, body: { ok: true } }
  } catch (error) {
    console.error('No se pudo enviar el correo de contacto', error)
    return {
      status: 502,
      body: {
        ok: false,
        error:
          'No se pudo enviar el correo. Revisa la contraseña de aplicación de Gmail.',
      },
    }
  }
}
