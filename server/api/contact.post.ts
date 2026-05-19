export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Please complete every field.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_EMAIL

  if (!apiKey || !recipient) {
    throw createError({ statusCode: 500, statusMessage: 'Contact form is not configured yet.' })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-nuxt',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipient],
      subject: `Portfolio message from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n'),
    }),
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw createError({
      statusCode: response.status || 502,
      statusMessage: payload?.message || 'Unable to send your message right now.',
    })
  }

  return { ok: true }
})
