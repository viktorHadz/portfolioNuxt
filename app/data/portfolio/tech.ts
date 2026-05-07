import alpineIcon from '~/assets/icons/tech/alpine-js.svg'
import canvasApiIcon from '~/assets/icons/tech/canvas-api.svg'
import cloudflareIcon from '~/assets/icons/tech/cloudflare.svg'
import cloudflarePagesIcon from '~/assets/icons/tech/cloudflare-pages.svg'
import cssIcon from '~/assets/icons/tech/css3.svg'
import debianIcon from '~/assets/icons/tech/debian.svg'
import expressIcon from '~/assets/icons/tech/express.svg'
import firebaseIcon from '~/assets/icons/tech/firebase.svg'
import githubIcon from '~/assets/icons/tech/github.svg'
import goIcon from '~/assets/icons/tech/go.svg'
import gsapIcon from '~/assets/icons/tech/gsap.svg'
import htmlIcon from '~/assets/icons/tech/html5.svg'
import javascriptIcon from '~/assets/icons/tech/javascript.svg'
import matplotlibIcon from '~/assets/icons/tech/matplotlib.svg'
import nextIcon from '~/assets/icons/tech/next-js.svg'
import nginxIcon from '~/assets/icons/tech/nginx.svg'
import nodeIcon from '~/assets/icons/tech/node-js.svg'
import oauthIcon from '~/assets/icons/tech/oauth2.svg'
import pythonIcon from '~/assets/icons/tech/python.svg'
import pythonDocxIcon from '~/assets/icons/tech/python-docx.svg'
import reactIcon from '~/assets/icons/tech/react.svg'
import resendIcon from '~/assets/icons/tech/resend.svg'
import sqliteIcon from '~/assets/icons/tech/sqlite.svg'
import svgIcon from '~/assets/icons/tech/svg.svg'
import supabaseIcon from '~/assets/icons/tech/supabase.svg'
import tailwindIcon from '~/assets/icons/tech/tailwind-css.svg'
import viteIcon from '~/assets/icons/tech/vite-js.svg'
import vueIcon from '~/assets/icons/tech/vue-js.svg'

const techIcons = {
  'Alpine.js': alpineIcon,
  'Canvas API': canvasApiIcon,
  Cloudflare: cloudflareIcon,
  'Cloudflare Pages': cloudflarePagesIcon,
  'Cloudflare Pages Functions': cloudflarePagesIcon,
  CSS3: cssIcon,
  Express: expressIcon,
  Firebase: firebaseIcon,
  'GitHub Actions': githubIcon,
  Go: goIcon,
  GSAP: gsapIcon,
  HTML5: htmlIcon,
  JavaScript: javascriptIcon,
  Linux: debianIcon,
  Matplotlib: matplotlibIcon,
  Next: nextIcon,
  'Next.js': nextIcon,
  Nginx: nginxIcon,
  Node: nodeIcon,
  'Node.js': nodeIcon,
  OAuth: oauthIcon,
  OAuth2: oauthIcon,
  Python: pythonIcon,
  'python-docx': pythonDocxIcon,
  React: reactIcon,
  Resend: resendIcon,
  SQL: sqliteIcon,
  SQLite: sqliteIcon,
  Supabase: supabaseIcon,
  SVG: svgIcon,
  Tailwind: tailwindIcon,
  TailwindCSS: tailwindIcon,
  'Tailwind CSS': tailwindIcon,
  Vite: viteIcon,
  'Vite.js': viteIcon,
  ViteSSG: viteIcon,
  Vue: vueIcon,
  'Vue.js': vueIcon,
  VueJS: vueIcon,
} as const

export function getTechIcon(name: string) {
  return techIcons[name as keyof typeof techIcons] ?? null
}
