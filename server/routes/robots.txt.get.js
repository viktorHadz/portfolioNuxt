import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const siteUrl = (
    process.env.NUXT_SITE_URL ||
    useRuntimeConfig(event).public.siteUrl
  ).replace(/\/+$/, '')

  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
})
