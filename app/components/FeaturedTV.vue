<script setup>
import gsap from 'gsap'

const tvIsOn = ref(false)

const content = '#demo-screen-content'
const screen = '#screen-blackout'
const line = '#scanline'
const orb = '#power-orb'

let tvTl
let antenaTw

const lineClosed = { x1: 237, x2: 237, y1: 282, y2: 282 }
const lineOpen = { x1: 105, x2: 370, y1: 282, y2: 282 }

function resetFx() {
  gsap.set(line, {
    autoAlpha: 0,
    scaleY: 1,
    strokeWidth: 5,
    transformOrigin: '50% 50%',
    attr: lineClosed,
  })

  gsap.set(orb, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' })
}

function playOn() {
  tvTl?.kill()
  resetFx()

  gsap.set(content, { autoAlpha: 0 })
  gsap.set(screen, { autoAlpha: 0, scaleY: 1, transformOrigin: '50% 50%' })

  tvTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tvTl
    .to(screen, { autoAlpha: 1, scaleY: 0, duration: 0.45, ease: 'expo.out' }, 0)
    .to(screen, { autoAlpha: 0, duration: 0.25, ease: 'sine.out' }, 0.42)
    .to(line, { autoAlpha: 1, attr: lineOpen, duration: 0.28, ease: 'power3.out' }, 0.12)
    .to(orb, { autoAlpha: 1, scale: 16, duration: 0.32, ease: 'expo.out' }, 0.18)
    .to(orb, { autoAlpha: 0, duration: 0.18, ease: 'sine.out' }, 0.42)
    .to(line, { scaleY: 50, duration: 0.38, ease: 'expo.inOut' }, 0.4)
    .to(line, { autoAlpha: 0, duration: 0.2, ease: 'sine.out' }, 0.7)
    .to(content, { autoAlpha: 1, duration: 0.45, ease: 'sine.out' })

  return tvTl
}

function playOff() {
  tvTl?.kill()
  resetFx()

  gsap.set(screen, { autoAlpha: 1, scaleY: 0, transformOrigin: '50% 50%' })

  tvTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tvTl
    // kill temporary FX
    .set([line, orb], { autoAlpha: 0 }, 0)

    // black cover grows upward and stays
    .to(screen, { scaleY: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out' }, 0.08)

  return tvTl
}

function switchTvOnOff(payload = !tvIsOn.value) {
  if (typeof payload !== 'boolean') return

  tvIsOn.value = payload

  if (payload) playOn()
  else playOff()
}

defineExpose({ switchTvOnOff })

onMounted(() => {
  gsap.set(content, { autoAlpha: 0 })

  gsap.set(screen, {
    autoAlpha: 1,
    scaleY: 1,
    transformOrigin: '50% 100%',
  })

  resetFx()

  antenaTw = gsap.to('.antena-glow', {
    fill: 'var(--acc-secondary)',
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
})

onUnmounted(() => {
  tvTl?.kill()
  antenaTw?.kill()
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 556 517">
    <g id="glow-back" filter="url(#filter0_f_1581_3050)">
      <path
        fill="var(--tv-lime)"
        fill-opacity=".56"
        fill-rule="evenodd"
        d="M195.515 35.1146c-3.094 6.033 1.468 9.4436 6.009 11.9346.342.1883 9.046 11.6961 19.341 25.5721 10.296 13.8766 18.851 25.5749 19.011 25.9969.368.9667-4.823 2.5608-5.517 2.9228-5.415 2.825-8.949 6.123-11.857 11.439l-70.473.012c-38.529.007-106.0402-12.362-116.0961 41.837-8.047 43.307-3.1913 90.898-3.1111 134.292.1744 94.271.1971 96.032 1.3873 108.872.7808 8.43 1.3795 16.766 4.419 24.716 6.7189 17.566 23.7654 29.864 42.1172 31.903 16.0306 1.782 1.573 19.831 5.0822 28.297l.8111 1.956 26.7784-.291 12.154-20.076 305.381.1 12.245 20.248c5.071 0 25.53 2.665 27.36-1.386 2.838-6.274-4.954-24.901 0-28.83 13.73-10.884 30.146-5.269 41.62-22.228 11.067-16.342 10.041-38.885 11.644-57.695.696-8.16.825-22.78.824-92.554-.003-78.41-.061-83.507-1.08-94.841-1.355-15.07-1.008-32.295-7.896-46.162-7.019-14.135-20.31-23.93-35.574-27.123-4.599-.962-8.665-1.017-75.604-1.031l-70.743-.016c-3.96-7.238-9.411-8.991-15.844-13.3846-.1-.0686 8.747-12.026 19.661-26.5723 10.914-14.5468 20.193-26.4482 20.62-26.4482 3.312 0 6.074-4.7086 6.074-7.6139 0-9.9078-14.013-10.1107-15.618-.8319-.231 1.3312-6.189 9.0964-22.724 29.6163-18.195 22.5794-22.614 27.7662-23.491 27.5724-15.542-3.433-31.152-.9793-46.766-.594-1.211.0289-4.462-3.7136-23.613-27.188-19.211-23.548-22.211-27.4641-22.222-29.0185-.058-7.638-10.968-9.9204-14.31-3.4027"
        clip-rule="evenodd"
      />
    </g>
    <ellipse
      id="Ellipse 239"
      cx="285.648"
      cy="489.23"
      fill="var(--tv-shadow)"
      rx="195.093"
      ry="12.1207"
    />
    <g id="Group 804">
      <path
        class="antena-glow"
        fill="var(--tv-lime)"
        stroke="var(--tv-outline)"
        stroke-width="2.13266"
        d="M201.243 32.5858c3.509-.227 6.537 2.4333 6.764 5.9419s-2.433 6.5369-5.942 6.764c-3.508.227-6.537-2.4333-6.764-5.9419s2.434-6.5369 5.942-6.764Z"
      />

      <path
        id="Polygon 24"
        fill="var(--tv-body-mid)"
        stroke="var(--tv-outline)"
        stroke-width="1.48744"
        d="m202.506 40.6143.601-.4733c1.7-1.34 4.162-1.0691 5.529.6094l45.8 56.2108-8.542 7.3148L201.8 46.1255c-1.306-1.7224-.991-4.1732.706-5.5112Z"
      />
      <path
        id="Ellipse 254"
        fill="var(--tv-outline)"
        d="M209.85 41.1844c-.405-.6252-.924-1.1683-1.525-1.596s-1.272-.731-1.973-.8913c-.7-.1603-1.414-.1743-2.099-.041-.684.1333-1.325.4109-1.882.816s-1.019.929-1.358 1.5398c-.339.6107-.547 1.2953-.612 2.012-.065.7166.014 1.4501.234 2.1556.219.7054.573 1.368 1.041 1.9471l1.127-.9305c-.333-.4119-.585-.8832-.741-1.3851-.156-.5018-.212-1.0236-.166-1.5333.046-.5098.194-.9968.435-1.4312.241-.4345.57-.8072.967-1.0953.396-.2882.851-.4857 1.338-.5805s.995-.0848 1.493.0292.976.3298 1.404.634c.428.3043.796.6906 1.084 1.1353z"
      />
    </g>
    <g id="Group 799">
      <path
        class="antena-glow"
        fill="var(--tv-lime)"
        stroke="var(--tv-outline)"
        stroke-width="2.13266"
        d="M355.796 32.578c-3.509-.227-6.537 2.4333-6.764 5.9419s2.433 6.5369 5.942 6.764c3.508.2269 6.537-2.4333 6.764-5.9419s-2.434-6.537-5.942-6.764Z"
      />
      <path
        id="Polygon 24_2"
        fill="var(--tv-body-mid)"
        stroke="var(--tv-outline)"
        stroke-width="1.48744"
        d="m354.541 40.6143-.601-.4733c-1.701-1.34-4.162-1.0691-5.53.6094l-45.799 56.2108 8.542 7.3148 44.094-58.1505c1.305-1.7224.991-4.1732-.706-5.5112Z"
      />
      <path
        id="Ellipse 254_2"
        fill="var(--tv-outline)"
        d="M347.174 41.1844c.404-.6252.923-1.1683 1.524-1.596.602-.4277 1.273-.731 1.973-.8913s1.414-.1743 2.099-.041 1.325.4109 1.882.816 1.019.929 1.358 1.5398c.339.6107.547 1.2953.612 2.012.066.7166-.014 1.4501-.233 2.1556-.22.7054-.574 1.368-1.042 1.9471l-1.127-.9305c.333-.4119.585-.8832.741-1.3851.156-.5018.213-1.0236.166-1.5333-.046-.5098-.194-.9968-.435-1.4312-.241-.4345-.57-.8072-.966-1.0953-.396-.2882-.852-.4857-1.339-.5805s-.995-.0848-1.493.0292-.976.3298-1.403.634c-.428.3043-.797.6906-1.085 1.1353z"
      />
    </g>
    <path
      id="Ellipse 253"
      fill="var(--tv-body-mid)"
      stroke="var(--tv-outline)"
      stroke-width="3.22278"
      d="M283.128 85.6465c20.498 0 39.115 6.3308 52.643 16.6415 13.528 10.312 22.035 24.673 22.035 40.662s-8.507 30.351-22.035 40.662-32.145 16.642-52.643 16.642c-20.497 0-39.114-6.331-52.642-16.642s-22.035-24.673-22.035-40.662 8.507-30.35 22.035-40.662c13.528-10.3106 32.144-16.6415 52.642-16.6415Z"
    />
    <path
      id="Polygon 22"
      fill="var(--tv-body-dark)"
      stroke="var(--tv-outline)"
      stroke-width="1.48744"
      d="M100.252 458.529h43.309l-.651 1.119-16.185 27.727c-1.022 1.751-2.898 2.828-4.925 2.828l-16.591-.001c-3.149 0-5.7021-2.553-5.7019-5.702l.0019-25.227-.0007-.744z"
    />
    <path
      id="Polygon 23"
      fill="var(--tv-body-dark)"
      stroke="var(--tv-outline)"
      stroke-width="1.48744"
      d="M467.326 458.529h-43.309l.651 1.119 16.185 27.727c1.022 1.751 2.898 2.828 4.925 2.828l16.591-.001c3.15 0 5.702-2.553 5.702-5.702l-.002-25.227.001-.744z"
    />
    <path
      id="Rectangle 683"
      fill="var(--tv-body-dark)"
      stroke="var(--tv-outline)"
      stroke-width="3.19899"
      d="m473.265 447.416-.41 1.932-.499 2.347c-1.411 6.651-7.282 11.407-14.081 11.408H108.822c-5.968 0-11.3181-3.684-13.448-9.259l-1.626-4.258-.8291-2.17z"
    />
    <rect
      id="Rectangle 718"
      width="492.609"
      height="340.807"
      x="39.2969"
      y="112.406"
      fill="var(--tv-outline)"
      rx="67.6783"
    />
    <rect
      id="Rectangle 715"
      width="484.476"
      height="332.675"
      x="43.4922"
      y="116.352"
      fill="var(--tv-lime)"
      rx="63.9597"
    />
    <rect
      id="Rectangle 717"
      width="474.373"
      height="325.529"
      x="48.4219"
      y="120.047"
      fill="var(--tv-lime-dark)"
      rx="57.5142"
    />
    <rect
      id="Rectangle 716"
      width="463.53"
      height="318.136"
      x="53.8281"
      y="123.742"
      fill="var(--tv-outline)"
      rx="54.5393"
    />
    <rect
      id="Rectangle 719"
      width="452.194"
      height="306.307"
      x="59.5078"
      y="129.641"
      fill="var(--tv-body)"
      rx="50.8207"
    />
    <g id="screen">
      <rect
        id="Rectangle 727"
        width="340.809"
        height="290.536"
        x="66.8984"
        y="137.234"
        fill="var(--gray)"
        rx="43.6314"
      />
      <g id="Group 810">
        <rect
          id="Rectangle 721"
          width="333.909"
          height="283.143"
          x="69.8828"
          y="141.266"
          fill="var(--tv-screen)"
          rx="42.8877"
        />
        <path
          id="Polygon 26"
          fill="url(#paint0_linear_1581_3050)"
          d="m341.031 351.797-27.499 10 53.382 61.937c22-2 36-22.5 36.77-38.468z"
        />
        <path
          id="Polygon 27"
          fill="url(#paint1_linear_1581_3050)"
          d="m132.459 351.869 27.5 10.001-53.383 61.937c-21.9995-2-36.6701-21.495-36.6779-41.511z"
        />
      </g>
      <rect
        id="Rectangle 726"
        width="313.702"
        height="267.619"
        x="79.8828"
        y="149.258"
        fill="var(--tv-outline)"
        rx="34.9547"
      />
      <rect
        id="Rectangle 725"
        width="304.584"
        height="259.733"
        x="84.8906"
        y="152.258"
        fill="var(--tv-screen-raised)"
        rx="32.4757"
      />
      <g id="demo-screen-content">
        <rect x="98" y="166" width="270" height="210" rx="24" fill="var(--bg-secondary)" />

        <circle cx="165" cy="235" r="42" fill="var(--acc-primary)" opacity=".9" />

        <circle cx="265" cy="255" r="62" fill="var(--acc-tertiary)" opacity=".45" />

        <path
          d="M125 335H340"
          stroke="var(--acc-secondary)"
          stroke-width="10"
          stroke-linecap="round"
        />

        <path
          d="M125 360H285"
          stroke="var(--acc-primary)"
          stroke-width="7"
          stroke-linecap="round"
          opacity=".8"
        />
      </g>

      <g id="turn-on-fx">
        <rect
          id="screen-blackout"
          x="85.5"
          y="152.5"
          width="303.5"
          height="259.5"
          rx="32"
          fill="var(--bg-primary)"
        />
        <line
          id="scanline"
          x1="237"
          y1="282"
          x2="237"
          y2="282"
          stroke="var(--acc-primary)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <circle id="power-orb" cx="237" cy="282" r="4" fill="var(--acc-primary)" />
      </g>

      <path
        id="shade"
        fill="var(--tv-screen-highlight)"
        fill-opacity=".4"
        d="M94.9087 170.761c6.0283-8.48 9.9813-12.599 27.8603-12.599 15.571 0 18.989-.546 58.489.454-12.814 2.342-61.332 2.996-74.067 11.485-4.376 4.378-10.3055 27.905-14.9889 64.5 0-27.497.1924-37.862.1924-48.349 0-8.592.5404-11.979 2.5142-15.491"
      />
    </g>
    <path
      id="Line 126"
      fill="var(--tv-outline)"
      d="M418.383 146.406h-.584c-.032 4.522-.063 9.044-.092 13.565-.263 40.695-.394 81.389-.394 122.084s.131 81.389.394 122.084c.029 4.521.06 9.043.092 13.565h.584c.032-4.522.063-9.044.092-13.565.263-40.695.394-81.389.394-122.084s-.131-81.389-.394-122.084c-.029-4.521-.06-9.043-.092-13.565"
    />
    <g id="Group 803">
      <g id="Group 757">
        <rect
          id="Rectangle 690"
          width="20.0806"
          height="10.9327"
          x="452.797"
          y="401.703"
          fill="var(--tv-lime)"
          stroke="var(--tv-outline)"
          stroke-width="1.03774"
          rx="5.46634"
        />
        <path
          id="Rectangle 691"
          fill="var(--tv-lime-dim)"
          d="M453.344 407.376c1.418 3.223 17.665 3.094 18.955-.001 0 2.635-2.136 4.771-4.771 4.771h-9.284c-2.656 0-4.828-2.115-4.9-4.77"
        />
        <ellipse
          id="Ellipse 238"
          cx="457.868"
          cy="404.926"
          fill="var(--tv-lime-glow)"
          rx="3.09467"
          ry="1.67627"
        />
      </g>
      <g id="Group 758">
        <ellipse
          id="Ellipse 237"
          cx="442.213"
          cy="407.134"
          fill="var(--tv-body-soft)"
          stroke="var(--tv-outline)"
          stroke-width="1.03774"
          rx="5.67356"
          ry="5.67352"
        />
        <ellipse
          id="Ellipse 238_2"
          cx="442.22"
          cy="407.642"
          fill="var(--tv-knob-face-dark)"
          rx="4.12622"
          ry="4.1262"
        />
      </g>
      <g id="Group 802">
        <circle
          v-for="dot in [
            [434.443, 165.482],
            [458.42, 154.896],
            [482.139, 165.482],
          ]"
          :key="dot.join('-')"
          :cx="dot[0]"
          :cy="dot[1]"
          r="1.98"
          fill="var(--tv-lime)"
          stroke="var(--tv-outline)"
          stroke-width=".70686"
        />
        <ellipse
          id="Ellipse 256"
          cx="458.227"
          cy="185.594"
          fill="var(--tv-outline)"
          rx="26.3677"
          ry="26.3676"
        />
        <ellipse
          id="Ellipse 257"
          cx="458.228"
          cy="185.579"
          fill="var(--tv-lime)"
          rx="24.1499"
          ry="24.1497"
        />
        <ellipse
          id="Ellipse 258"
          cx="458.229"
          cy="185.596"
          fill="var(--tv-outline)"
          rx="21.932"
          ry="21.9319"
        />
        <ellipse
          id="Ellipse 259"
          cx="458.107"
          cy="185.716"
          fill="var(--tv-knob-face)"
          rx="19.591"
          ry="19.5909"
        />
        <ellipse
          id="Ellipse 260"
          cx="458.107"
          cy="186.81"
          fill="var(--tv-body)"
          rx="19.591"
          ry="18.4819"
        />
        <path
          id="Line 127"
          fill="var(--tv-lime)"
          d="m457.316 184.324-1.263.91 1.822 2.525 1.262-.911-.91-1.262zm19.582-10.29c.698-.503.855-1.476.352-2.173s-1.476-.854-2.173-.351l.911 1.262zm-18.671 11.552.91 1.262 17.761-12.814-.91-1.262-.911-1.262-17.761 12.814z"
        />
      </g>
      <g id="Group 801">
        <ellipse
          id="Ellipse 266"
          cx="458.253"
          cy="251.027"
          fill="var(--tv-outline)"
          rx="19.5891"
          ry="19.589"
        />
        <path
          id="Line 129"
          stroke="var(--tv-lime)"
          stroke-linecap="round"
          stroke-width="1.96634"
          d="M458.499 228.21v1.099"
        />
        <path
          id="Line 139"
          stroke="var(--tv-lime)"
          stroke-linecap="round"
          stroke-width="1.96634"
          d="M.98317-.98317h1.0991"
          transform="matrix(0 -1 -1 0 457.906 275.359)"
        />
        <path
          id="Line 134"
          stroke="var(--tv-lime)"
          stroke-linecap="round"
          stroke-width="1.96634"
          d="M435.803 250.97h1.1"
        />
        <path
          id="Line 138"
          stroke="var(--tv-lime)"
          stroke-linecap="round"
          stroke-width="1.96634"
          d="M.98317-.98317h1.09912"
          transform="matrix(-1 0 0 1 481.641 251.031)"
        />
        <ellipse
          id="Ellipse 267"
          cx="458.254"
          cy="251.035"
          fill="var(--tv-lime)"
          rx="17.9415"
          ry="17.9413"
        />
        <ellipse
          id="Ellipse 268"
          cx="458.247"
          cy="251.036"
          fill="var(--tv-outline)"
          rx="16.2938"
          ry="16.2937"
        />
        <ellipse
          id="Ellipse 269"
          cx="458.156"
          cy="251.133"
          fill="var(--tv-knob-face)"
          rx="14.5546"
          ry="14.5545"
        />
        <ellipse
          id="Ellipse 270"
          cx="458.156"
          cy="252.133"
          fill="var(--tv-body)"
          rx="14.5546"
          ry="13.5475"
        />
        <path
          id="Line 128"
          fill="var(--tv-lime)"
          d="m457.573 250.093-.937.677 1.353 1.876.938-.677-.677-.938zm14.549-7.644c.518-.373.635-1.096.261-1.614s-1.097-.635-1.615-.261l.677.937zm-13.872 8.582.677.938 13.195-9.52-.677-.938-.677-.937-13.195 9.519z"
        />
      </g>
      <g id="grill-lines">
        <use v-for="i in 7" :key="i" href="#grill-line" :y="(i - 1) * 12" />
      </g>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1581_3050"
        x1="399.82"
        x2="368.335"
        y1="382.084"
        y2="423.877"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="var(--tv-screen)" />
        <stop offset=".24985" stop-color="var(--tv-body)" />
        <stop offset=".49511" stop-color="var(--tv-body-soft)" />
        <stop offset=".74923" stop-color="var(--tv-body)" />
        <stop offset="1" stop-color="var(--tv-screen)" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1581_3050"
        x1="73.6801"
        x2="105.165"
        y1="382.154"
        y2="423.948"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="var(--tv-screen)" />
        <stop offset=".24985" stop-color="var(--tv-body)" />
        <stop offset=".49511" stop-color="var(--tv-body-soft)" />
        <stop offset=".74923" stop-color="var(--tv-body)" />
        <stop offset="1" stop-color="var(--tv-screen)" />
      </linearGradient>
      <filter
        id="filter0_f_1581_3050"
        width="555.945"
        height="517"
        x=".00007"
        y=".00007"
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur result="effect1_foregroundBlur_1581_3050" stdDeviation="15.6484" />
      </filter>
      <g id="grill-line">
        <rect x="432.297" y="301.297" width="52" height="6" rx="3" fill="var(--tv-grill-dark)" />

        <rect x="432.297" y="303.797" width="52" height="5" rx="2.5" fill="var(--tv-grill-light)" />
        <rect x="432.297" y="303.297" width="52" height="4" rx="2" fill="var(--tv-grill-mid)" />
      </g>
    </defs>
  </svg>
</template>
