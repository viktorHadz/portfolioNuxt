<script setup>
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

function orbit(target, path, { duration = 5, offset = 0 } = {}) {
  return gsap.to(target, {
    duration,
    repeat: -1,
    ease: 'none',
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      start: offset,
      end: offset + 1,
    },
  })
}

const ovals = [
  {
    id: 'inner-decor-oval',
    path: '#ring-inner',
    duration: 6,
    offset: 0,
  },
  {
    id: 'middle-decor-oval',
    path: '#ring-mid-transform',
    duration: 6,
    offset: 0,
  },
  {
    id: 'outer-decor-oval',
    path: '#outer-ring-blue',
    duration: 6,
    offset: 0,
  },
  {
    id: 'outer-decor-oval-2',
    path: '#outer-ring-blue',
    duration: 6,
    offset: 2,
  },
]

onMounted(() => {
  ovals.forEach((p) => {
    orbit(`#${p.id}`, p.path, {
      duration: p.duration,
      offset: p.offset,
    })
  })
})
</script>
<template>
  <svg
    width="1150"
    height="1013"
    viewBox="0 0 1150 1013"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="ring-decor">
      <g id="inner">
        <path
          id="ring-inner"
          d="M644.5 230C802.725 230 931 358.937 931 518C931 677.063 802.725 806 644.5 806C486.275 806 358 677.063 358 518C358 358.937 486.275 230 644.5 230Z"
          stroke="url(#paint0_linear_1395_2097)"
          stroke-width="2"
        />
        <g id="inner-decor-oval">
          <g
            id="Ellipse 175"
            filter="url(#filter0_f_1395_2097)"
          >
            <circle
              cx="929.5"
              cy="544.5"
              r="13.5"
              fill="#AFD84B"
              fill-opacity="0.35"
              style="
                fill: #afd84b;
                fill: color(display-p3 0.6863 0.8471 0.2941);
                fill-opacity: 0.35;
              "
            />
          </g>
          <circle
            id="Ellipse 174"
            cx="929.5"
            cy="544.5"
            r="8.5"
            fill="#EAFFB7"
            style="fill: #eaffb7; fill: color(display-p3 0.9184 1 0.7195); fill-opacity: 1"
          />
        </g>
        <g
          id="inner-decor-blob"
          filter="url(#filter1_f_1395_2097)"
        >
          <ellipse
            cx="509.964"
            cy="263.272"
            rx="8.5"
            ry="2.97619"
            transform="rotate(-24.8558 509.964 263.272)"
            fill="#E2FF9D"
            fill-opacity="0.37"
            style="fill: #e2ff9d; fill: color(display-p3 0.8882 1 0.6156); fill-opacity: 0.37"
          />
        </g>
        <ellipse
          id="inner-decor-blob_2"
          cx="509.964"
          cy="263.272"
          rx="8.5"
          ry="2.97619"
          transform="rotate(-24.8558 509.964 263.272)"
          fill="#E2FF9D"
          style="fill: #e2ff9d; fill: color(display-p3 0.8882 1 0.6156); fill-opacity: 1"
        />
      </g>
      <g id="outer">
        <path
          id="outer-ring-blue"
          d="M644.5 1002.5C579.495 1002.5 515.127 989.761 455.071 965.01C395.015 940.26 340.446 903.982 294.481 858.249C248.516 812.516 212.055 758.223 187.179 698.471C162.303 638.718 149.5 574.676 149.5 510C149.5 445.324 162.303 381.282 187.179 321.529C212.055 261.777 248.516 207.484 294.481 161.751C340.446 116.018 395.015 79.7403 455.071 54.9896C515.127 30.239 579.495 17.5 644.5 17.5C709.505 17.5 773.873 30.239 833.929 54.9897C893.986 79.7403 948.554 116.018 994.519 161.751C1040.48 207.484 1076.94 261.777 1101.82 321.529C1126.7 381.282 1139.5 445.324 1139.5 510C1139.5 574.676 1126.7 638.718 1101.82 698.471C1076.94 758.224 1040.48 812.516 994.519 858.249C948.554 903.982 893.985 940.26 833.929 965.01C773.873 989.761 709.505 1002.5 644.5 1002.5L644.5 1002.5Z"
          stroke="url(#paint1_linear_1395_2097)"
        />
        <g
          id="Ellipse 171"
          filter="url(#filter2_f_1395_2097)"
        >
          <path
            d="M644.5 1002.5C579.495 1002.5 515.127 989.761 455.071 965.01C395.015 940.26 340.446 903.982 294.481 858.249C248.516 812.516 212.055 758.223 187.179 698.471C162.303 638.718 149.5 574.676 149.5 510C149.5 445.324 162.303 381.282 187.179 321.529C212.055 261.777 248.516 207.484 294.481 161.751C340.446 116.018 395.015 79.7403 455.071 54.9896C515.127 30.239 579.495 17.5 644.5 17.5C709.505 17.5 773.873 30.239 833.929 54.9897C893.986 79.7403 948.554 116.018 994.519 161.751C1040.48 207.484 1076.94 261.777 1101.82 321.529C1126.7 381.282 1139.5 445.324 1139.5 510C1139.5 574.676 1126.7 638.718 1101.82 698.471C1076.94 758.224 1040.48 812.516 994.519 858.249C948.554 903.982 893.985 940.26 833.929 965.01C773.873 989.761 709.505 1002.5 644.5 1002.5L644.5 1002.5Z"
            stroke="#4AA3FF"
            stroke-opacity="0.35"
            style="stroke: #4aa3ff; stroke: color(display-p3 0.2902 0.6392 1); stroke-opacity: 0.35"
          />
        </g>
        <g id="outer-decor-oval-2">
          <g
            id="Ellipse 179"
            filter="url(#filter3_f_1395_2097)"
          >
            <circle
              cx="613.5"
              cy="18.5"
              r="8.5"
              fill="#D4E9FF"
              fill-opacity="0.37"
              style="fill: #d4e9ff; fill: color(display-p3 0.8316 0.914 0.9992); fill-opacity: 0.37"
            />
          </g>
          <circle
            id="Ellipse 178"
            cx="613.667"
            cy="18.6672"
            r="4.66722"
            fill="#D4E9FF"
            style="fill: #d4e9ff; fill: color(display-p3 0.8316 0.914 0.9992); fill-opacity: 1"
          />
        </g>
        <g id="outer-decor-oval">
          <path
            id="Ellipse 180"
            d="M307.212 871.214C307.824 871.826 307.83 872.838 307.093 873.292C306.757 873.498 306.401 873.676 306.031 873.822C305.17 874.162 304.242 874.326 303.301 874.304C302.36 874.282 301.423 874.075 300.545 873.695C299.667 873.314 298.865 872.768 298.184 872.087C297.503 871.406 296.956 870.603 296.576 869.725C296.196 868.847 295.989 867.911 295.967 866.97C295.945 866.028 296.108 865.101 296.448 864.24C296.595 863.869 296.772 863.514 296.979 863.178C297.433 862.441 298.444 862.447 299.057 863.059V863.059C299.669 863.671 299.624 864.673 299.307 865.478V865.478C299.112 865.971 299.018 866.502 299.031 867.041C299.043 867.58 299.162 868.116 299.38 868.619C299.597 869.121 299.91 869.581 300.3 869.97C300.69 870.36 301.149 870.673 301.652 870.891C302.155 871.109 302.691 871.227 303.23 871.24C303.768 871.252 304.3 871.159 304.793 870.964V870.964C305.598 870.646 306.6 870.602 307.212 871.214V871.214Z"
            fill="url(#paint2_linear_1395_2097)"
            fill-opacity="0.35"
          />
          <g
            id="Ellipse 179_2"
            filter="url(#filter4_f_1395_2097)"
          >
            <circle
              cx="303.405"
              cy="867.288"
              r="9.33443"
              fill="#B6DAFF"
              fill-opacity="0.36"
              style="fill: #b6daff; fill: color(display-p3 0.7133 0.8543 1); fill-opacity: 0.36"
            />
          </g>
          <circle
            id="Ellipse 178_2"
            cx="303.402"
            cy="867.288"
            r="4.66722"
            fill="#D4E9FF"
            style="fill: #d4e9ff; fill: color(display-p3 0.8316 0.914 0.9992); fill-opacity: 1"
          />
        </g>
      </g>
      <g id="middle">
        <path
          id="ring-mid-transform"
          d="M1071.5 518C1071.5 752.995 880.104 943.5 644 943.5C407.896 943.5 216.5 752.995 216.5 518C216.5 283.005 407.896 92.5 644 92.5C880.104 92.5 1071.5 283.005 1071.5 518Z"
          stroke="url(#paint3_linear_1395_2097)"
        />
        <g
          id="ring-mid-3-g"
          filter="url(#filter5_f_1395_2097)"
        >
          <path
            id="ring-mid-3"
            d="M1071 518C1071 752.717 879.83 943 644 943C408.17 943 217 752.717 217 518C217 283.283 408.17 93 644 93C879.83 93 1071 283.283 1071 518Z"
            stroke="url(#paint4_linear_1395_2097)"
            stroke-opacity="0.32"
            stroke-width="2"
          />
        </g>
        <g id="middle-decor-oval">
          <circle
            id="Ellipse 181"
            cx="268.5"
            cy="313.5"
            r="5.5"
            fill="#FFEF75"
            style="fill: #ffef75; fill: color(display-p3 1 0.9353 0.46); fill-opacity: 1"
          />
          <g
            id="Ellipse 183"
            filter="url(#filter6_f_1395_2097)"
          >
            <circle
              cx="268.5"
              cy="313.5"
              r="11.5"
              fill="#FFEF75"
              fill-opacity="0.37"
              style="fill: #ffef75; fill: color(display-p3 1 0.9353 0.46); fill-opacity: 0.37"
            />
          </g>
          <circle
            id="Ellipse 182"
            cx="269"
            cy="315"
            r="4"
            fill="#FFFAD7"
            style="fill: #fffad7; fill: color(display-p3 1 0.9814 0.845); fill-opacity: 1"
          />
        </g>
      </g>
      <g id="hoz-ring">
        <path
          id="Ellipse 173"
          d="M227.175 870.014C166.092 874.597 118.635 867.71 89.8227 850.193C75.4305 841.443 65.9778 830.216 61.5375 816.89C57.0957 803.56 57.651 788.074 63.38 770.776C74.8445 736.161 106.558 695.717 155.201 653.801C203.832 611.896 267.497 570.147 339.358 533.044"
          stroke="url(#paint5_linear_1395_2097)"
        />
        <g
          id="Ellipse 174_2"
          filter="url(#filter7_f_1395_2097)"
        >
          <path
            d="M227.175 870.014C166.092 874.597 118.635 867.71 89.8227 850.193C75.4305 841.443 65.9778 830.216 61.5375 816.89C57.0957 803.56 57.651 788.074 63.38 770.776C74.8445 736.161 106.558 695.717 155.201 653.801C203.832 611.896 267.497 570.147 339.358 533.044"
            stroke="url(#paint6_linear_1395_2097)"
            stroke-opacity="0.37"
          />
        </g>
        <g id="Group 657">
          <ellipse
            id="Ellipse 176"
            cx="64.1701"
            cy="768.901"
            rx="2.35279"
            ry="6.5"
            transform="rotate(17.1276 64.1701 768.901)"
            fill="#CEF471"
            style="fill: #cef471; fill: color(display-p3 0.8074 0.9568 0.443); fill-opacity: 1"
          />
          <g
            id="Ellipse 177"
            filter="url(#filter8_f_1395_2097)"
          >
            <ellipse
              cx="64.0185"
              cy="769.291"
              rx="4.53038"
              ry="12.516"
              transform="rotate(17.1276 64.0185 769.291)"
              fill="#CEF471"
              fill-opacity="0.5"
              style="fill: #cef471; fill: color(display-p3 0.8074 0.9568 0.443); fill-opacity: 0.5"
            />
          </g>
        </g>
        <g id="hoz-decor-oval">
          <g
            id="Ellipse 175_2"
            filter="url(#filter9_f_1395_2097)"
          >
            <circle
              cx="227.508"
              cy="870.5"
              r="13.5"
              fill="#AFD84B"
              fill-opacity="0.16"
              style="
                fill: #afd84b;
                fill: color(display-p3 0.6863 0.8471 0.2941);
                fill-opacity: 0.16;
              "
            />
          </g>
          <path
            id="Ellipse 177_2"
            d="M231.628 877.653C232.248 878.726 231.883 880.125 230.702 880.503C230.107 880.694 229.494 880.832 228.871 880.914C227.504 881.094 226.115 881.003 224.783 880.646C223.451 880.289 222.202 879.673 221.108 878.834C220.015 877.994 219.097 876.948 218.407 875.753C217.718 874.559 217.27 873.241 217.09 871.874C216.91 870.507 217.001 869.118 217.358 867.786C217.715 866.454 218.331 865.205 219.17 864.111C219.553 863.613 219.978 863.151 220.441 862.731C221.359 861.897 222.753 862.28 223.373 863.354V863.354C223.992 864.427 223.577 865.784 222.803 866.752C222.779 866.783 222.755 866.813 222.731 866.844C222.251 867.47 221.898 868.185 221.694 868.948C221.49 869.71 221.438 870.505 221.541 871.288C221.644 872.071 221.9 872.825 222.295 873.509C222.689 874.193 223.215 874.792 223.841 875.273C224.467 875.753 225.182 876.106 225.945 876.31C226.707 876.514 227.502 876.566 228.285 876.463C228.324 876.458 228.362 876.453 228.4 876.447C229.626 876.261 231.009 876.58 231.628 877.653V877.653Z"
            fill="url(#paint7_linear_1395_2097)"
            fill-opacity="0.35"
          />
          <circle
            id="Ellipse 176_2"
            cx="227.477"
            cy="870.512"
            r="6.5"
            fill="#F4FFD8"
            style="fill: #f4ffd8; fill: color(display-p3 0.955 1 0.8452); fill-opacity: 1"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_1395_2097"
        x="906"
        y="521"
        width="47"
        height="47"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter1_f_1395_2097"
        x="492.148"
        y="248.793"
        width="35.6328"
        height="28.957"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter2_f_1395_2097"
        x="139"
        y="7"
        width="1011"
        height="1006"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter3_f_1395_2097"
        x="595"
        y="0"
        width="37"
        height="37"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter4_f_1395_2097"
        x="284.07"
        y="847.953"
        width="38.6719"
        height="38.668"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter5_f_1395_2097"
        x="206"
        y="82"
        width="876"
        height="872"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter6_f_1395_2097"
        x="247"
        y="292"
        width="43"
        height="43"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter7_f_1395_2097"
        x="48.0938"
        y="522.602"
        width="301.492"
        height="359.293"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter8_f_1395_2097"
        x="49.5359"
        y="748.454"
        width="28.9672"
        height="41.6742"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="4.4"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <filter
        id="filter9_f_1395_2097"
        x="204.008"
        y="847"
        width="47"
        height="47"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="5"
          result="effect1_foregroundBlur_1395_2097"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1395_2097"
        x1="507.925"
        y1="229"
        x2="781.075"
        y2="807"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#AFD84B"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.5"
          stop-color="#86A539"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.75"
          stop-color="#AFD84B"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.875"
          stop-color="#86A539"
          style="
            stop-color: #86a539;
            stop-color: color(display-p3 0.5242 0.6471 0.2247);
            stop-opacity: 1;
          "
        />
        <stop
          offset="1"
          stop-color="#AFD84B"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1395_2097"
        x1="644.556"
        y1="17"
        x2="644.556"
        y2="1003"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.25"
          stop-color="#4AA3FF"
          stop-opacity="0.18"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 0.18;
          "
        />
        <stop
          offset="0.375"
          stop-color="#4AA3FF"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.5"
          stop-color="#4AA3FF"
          stop-opacity="0.4"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 0.4;
          "
        />
        <stop
          offset="0.75"
          stop-color="#4AA3FF"
          stop-opacity="0.7"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 0.7;
          "
        />
        <stop
          offset="1"
          stop-color="#4AA3FF"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 1;
          "
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1395_2097"
        x1="304.742"
        y1="870.288"
        x2="296.736"
        y2="873.955"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.0913461"
          stop-color="#4AA3FF"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.538462"
          stop-color="#4AA3FF"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 1;
          "
        />
        <stop
          offset="1"
          stop-color="#4AA3FF"
          style="
            stop-color: #4aa3ff;
            stop-color: color(display-p3 0.2902 0.6392 1);
            stop-opacity: 1;
          "
        />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1395_2097"
        x1="1072"
        y1="315.631"
        x2="215.838"
        y2="720.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.5"
          stop-color="#FFEB58"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.75"
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.875"
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="1"
          stop-color="#FFEB58"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1395_2097"
        x1="1072"
        y1="315.631"
        x2="215.838"
        y2="720.024"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.5"
          stop-color="#FFEB58"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.75"
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="0.875"
          stop-color="#FFEB58"
          style="
            stop-color: #ffeb58;
            stop-color: color(display-p3 1 0.9216 0.3451);
            stop-opacity: 1;
          "
        />
        <stop
          offset="1"
          stop-color="#FFEB58"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
      </linearGradient>
      <linearGradient
        id="paint5_linear_1395_2097"
        x1="477"
        y1="460"
        x2="256.114"
        y2="877.82"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#AFD84B"
          stop-opacity="0.1"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.1;
          "
        />
        <stop
          offset="0.5"
          stop-color="#AFD84B"
          stop-opacity="0.3"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.3;
          "
        />
        <stop
          offset="0.625"
          stop-color="#AFD84B"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.6875"
          stop-color="#AFD84B"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.75"
          stop-color="#AFD84B"
          stop-opacity="0.5"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.5;
          "
        />
        <stop
          offset="1"
          stop-color="#AFD84B"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 1;
          "
        />
      </linearGradient>
      <linearGradient
        id="paint6_linear_1395_2097"
        x1="477"
        y1="460"
        x2="256.114"
        y2="877.82"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#AFD84B"
          stop-opacity="0.1"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.1;
          "
        />
        <stop
          offset="0.5"
          stop-color="#AFD84B"
          stop-opacity="0.3"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.3;
          "
        />
        <stop
          offset="0.625"
          stop-color="#AFD84B"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.6875"
          stop-color="#AFD84B"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.75"
          stop-color="#AFD84B"
          stop-opacity="0.5"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.5;
          "
        />
        <stop
          offset="1"
          stop-color="#AFD84B"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 1;
          "
        />
      </linearGradient>
      <linearGradient
        id="paint7_linear_1395_2097"
        x1="232"
        y1="863.409"
        x2="218.864"
        y2="876.545"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.0913461"
          stop-color="#86A539"
          stop-opacity="0"
          style="stop-color: none; stop-opacity: 0"
        />
        <stop
          offset="0.538462"
          stop-color="#AFD84B"
          stop-opacity="0.5"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 0.5;
          "
        />
        <stop
          offset="1"
          stop-color="#AFD84B"
          style="
            stop-color: #afd84b;
            stop-color: color(display-p3 0.6863 0.8471 0.2941);
            stop-opacity: 1;
          "
        />
      </linearGradient>
    </defs>
  </svg>
</template>
