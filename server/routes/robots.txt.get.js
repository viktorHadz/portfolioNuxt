import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const siteUrl = (getSiteConfig(event).url || 'https://bitsbyvik.com').replace(/\/+$/, '')

  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
})
