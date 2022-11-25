<template>
    <l-marker :lat-lng="marker" :icon="iconMarker">
        <l-popup v-if="popup" @innerClick="innerClick" :data="popup_data" />
        <l-tooltip v-if="tooltip"  @innerClick="innerClick" :data="tooltip_data" />
    </l-marker>
</template>

<script>
import L from 'leaflet'
import { LMarker } from 'vue2-leaflet'
import MapTooltip from '@/components/Map/MapTooltip.vue'
import MapPopup from '@/components/Map/MapPopup.vue'
// import 'leaflet-extra-markers'
export default {
  name: 'MapMarker',
  components: {
    'l-popup': MapPopup,
    'l-tooltip': MapTooltip,
    'l-marker': LMarker
  },
  props: {
    marker: {
      type: Object,
      required: true
    },
    popup: {
      type: Boolean,
      default: false
    },
    popup_data: {
      type: Object
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    tooltip_data: {
      type: Object
    },
    iconColor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      LeafIcon: L.Icon.extend({
        options: {
          iconSize: [35, 45],
          iconAnchor: [17, 42],
          popupAnchor: [1, -32],
          shadowAnchor: [10, 12],
          shadowSize: [36, 16]
        }
      }),
      getColorHex: function (color) {
        const colorMap = {
          red: '#a23337',
          'orange-dark': '#d73e29',
          orange: '#ef9227',
          yellow: '#f5bb39',
          'blue-dark': '#276273',
          cyan: '#32a9dd',
          purple: '#440444',
          violet: '#90278d',
          pink: '#c057a0',
          green: '#006838',
          white: '#e8e8e8',
          black: '#211c1d'
        }
        return colorMap[color] || color
      },
      createSvg: function (shape, markerColor) {
        const svgMap = {
          circle: '<svg width="32" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg" ><path d="M17.5 2.746c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.439-17.863.056-.08a15.422 15.422 0 002.343-6.112c.123-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307" fill="' + markerColor + '" /><path d="M17.488 2.748c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.44-17.863.055-.08a15.422 15.422 0 002.343-6.112c.124-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307m0 1.071c7.68 0 13.929 6.386 13.929 14.236 0 .685-.064 1.423-.193 2.258-.325 2.075-1.059 3.99-2.164 5.667l-.055.078-11.557 16.595L6.032 26.14l-.12-.174a14.256 14.256 0 01-2.105-5.29 14.698 14.698 0 01-.247-2.62c0-7.851 6.249-14.237 13.928-14.237" fill="#231f20" opacity=".15" /></svg>',
          square: '<svg width="32" height="44" viewBox="0 0 33 45" xmlns="http://www.w3.org/2000/svg"><path d="M28.205 3.217H6.777c-2.367 0-4.286 1.87-4.286 4.179v19.847c0 2.308 1.919 4.179 4.286 4.179h5.357l5.337 13.58 5.377-13.58h5.357c2.366 0 4.285-1.87 4.285-4.179V7.396c0-2.308-1.919-4.179-4.285-4.179" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0714 0 0 -1.0714 -233.22 146.783)"><path d="M244 134h-20c-2.209 0-4-1.746-4-3.9v-18.525c0-2.154 1.791-3.9 4-3.9h5L233.982 95 239 107.675h5c2.209 0 4 1.746 4 3.9V130.1c0 2.154-1.791 3.9-4 3.9m0-1c1.654 0 3-1.301 3-2.9v-18.525c0-1.599-1.346-2.9-3-2.9h-5.68l-.25-.632-4.084-10.318-4.055 10.316-.249.634H224c-1.654 0-3 1.301-3 2.9V130.1c0 1.599 1.346 2.9 3 2.9h20" fill="#231f20" /></g></svg>',
          star: '<svg width="34" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M32.92 16.93l-3.525-3.525V8.419a1.983 1.983 0 00-1.983-1.982h-4.985L18.9 2.91a1.984 1.984 0 00-2.803 0l-3.524 3.526H7.588a1.983 1.983 0 00-1.982 1.982v4.986L2.081 16.93a1.982 1.982 0 000 2.803l3.525 3.526v4.984c0 1.096.888 1.983 1.982 1.983h4.986L17.457 45l4.97-14.773h4.985a1.983 1.983 0 001.983-1.983V23.26l3.525-3.526a1.982 1.982 0 000-2.803" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0667 0 0 -1.0667 -347.3 97.26)"><path d="M342 89c-.476 0-.951-.181-1.314-.544l-3.305-3.305h-4.673a1.858 1.858 0 01-1.859-1.858v-4.674l-3.305-3.305a1.857 1.857 0 010-2.627l3.305-3.305v-4.674a1.86 1.86 0 011.859-1.859h4.673L341.959 49l4.659 13.849h4.674a1.86 1.86 0 011.859 1.859v4.674l3.305 3.305a1.858 1.858 0 010 2.627l-3.305 3.305v4.674a1.859 1.859 0 01-1.859 1.858h-4.674l-3.304 3.305A1.851 1.851 0 01342 89m0-1a.853.853 0 00.607-.251l3.304-3.305.293-.293h5.088a.86.86 0 00.859-.858v-5.088l3.598-3.598A.852.852 0 00356 74a.85.85 0 00-.251-.606l-3.598-3.598v-5.088a.86.86 0 00-.859-.859h-5.393l-.229-.681-3.702-11.006-3.637 11.001-.227.686h-5.396a.86.86 0 00-.859.859v5.088l-3.598 3.598c-.162.162-.251.377-.251.606s.089.445.251.607l3.598 3.598v5.088a.86.86 0 00.859.858h5.087l3.598 3.598A.853.853 0 00342 88" fill="#231f20" /></g></svg>',
          penta: '<svg width="33" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M1.872 17.35L9.679 2.993h15.615L33.1 17.35 17.486 44.992z" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0769 0 0 -1.0769 -272.731 48.23)"><path d="M276.75 42h-14.5L255 28.668 269.5 3 284 28.668zm-.595-1l6.701-12.323L269.5 5.033l-13.356 23.644L262.845 41z" fill="#231f20" /></g></svg>',
          emre: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="50" width="40">
                <g transform="translate(-814.59595,-274.38623)">
                  <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                    <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${this.iconColor.color};stroke:${this.iconColor.strokeColor};"/>
                    <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${this.iconColor.circleColor};"/>
                  </g>
                </g>
              </svg>`
        }

        return svgMap[shape]
      }
    }
  },

  computed: {
    green_icon () {
      return new this.LeafIcon({
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAUlSURBVFjDrZdLiBxVFIb/e289uqt6kkx6zIiIoKgLRReKuMhCcaOIAUEIiCCE4CIPggZ8kBjooPgM0TiYEUUjqBGchZqAQlyYRTA+kJiJQiJGMjN5zYzT3dP1rrr3HBeTjDGTSfc8Dvyruud89Z9z6kIJdBj31763MivsJXKuZYF6dak5++2mh7NOcsXVHq6sHbhOK/24kOJJMO4AE1vKygwZhxlKSHGKiD+RSu09vOXB43OCrHz96y6T2lsh+OmKXzFdlbLne2UopSAupBhjECcZgjDMgiiSxPhcK/nCr1sfOtcWcm/tq9uEsL4rl0vdK67pKVu2jUwTMk0wBBAzpBCQAnAtiZIlwWQwPlHPglZQAFj1Y23VwVkh92zbd59U+Kanp+p2L12mooKQ5AbcpuclS6LiKoRhxOfHzhXMcs3PtVV7Z0DufXH/LSzpSG9vr1/p6kIz0dDUrvx/IYXAsrJCkWc4e/Z0Zpgf+KX26A/TkNtrXziesY9Xq8tvWNZdVfVYg7hzwKVv3O3ZiKMWj46OTrq5fdOh1x5pSADwjdzo2nbv0u6qqkca2jCIMGcZAuqRhu8vEX7ZK2V2WgMAcXdtvyeKbPS662+osCohzMycHVweniNREoShoZO5KYobpciSh23bFq7rIUgNiLFghRkBlg2v7GlpiccsCHrcryzxUk3zmsNskeYGvt/lxVH4hMWEu9xSWaQFYQ7L1B6iGZ5bBoy+zWKiHiltFHpqeIsVhWaosg1iqlgg4wAAEYEXsV3EmNppJmExMFYUxfVSuIs6E0sI5FkBBhLJzH9laQxLSjBj0WQJgSJPweDTkknvS4JGbCuxKOt7UY4lEQfNnAu9TzLxN2nUdAQTLAEw8YIlAVgAkmDCSBL75eCutSeY+GTUqqNkqUVxUbIl4qgJo4vWzecrhyQAMJldYf1MXLLl1EIsYBZgoGwpRI2zMTPtGBhYbSQAlJF9lieRzNMIriVBzPOWawvoIkYaNC0u9IcAIAHgp75NLQl8ENbPZJ6jgAU48RyFqHEuZyE+Pda/vjENAQBD5s209Y+kPJlyM4+r3lUS0AWSyVEhpHnjYu1pyO+7N4ywwPvhxHDiuwo8j1b5rkQwMZIziYHBXetPzIAAgIV8exZOSMoieI6aU5vKtgR0jqw1JtiYbZfW/R/kSN+mcWbxdtwYjn1XTd9B7cQAfNdCWB/OhBR7jvWv/3tWCAAoO3ktjyZZJ0HHbsq2AooERVQXzPKly2vOgPz29jNNBr+e1IcSz5YAM4hmFzPDtyWS+lDK4N2DfU+dbgsBAFHyd+oszE3agt/GjWcrUBEjj5sQBb96pXpXhAzueDJi4u1p41TsuQpCiFln4bkKeXMoJeadg++tG+sYAgBBXOo3RRrruAnfkWDmGfIdCeQhiiQgQbxjtlqzQk59vCZlNluL5lDiORLyMjcA4DsKeXM4AfDKxa97ThAAqPaMfaR1Nq6jOiqOAhOm5TsKJg1QZGGRedY7V6tzVcjBWk1D0JZ8cigt2RJSimkXnqOgW8MxQLUTb6wN5g0BgGPV0c9BekTH41xx5YXrQ8FkTRgdpxU7ea9djbYQ1GokmJ43wUhWtgRcS04tQjAcw9CWw29tThYOAXD03XVfMps/TTTOy30blDZgiqxFK6p7OsnvCDJ1UD9LyUjORoPDkUQyPfdHbXW+qJCjfRsOwOAoNY4z6Xz01rHq3k5zO4ZMHTabYSIhJD87MLB64f8Ys8WdG/tfBljMJedfwY+s/2P4Pv8AAAAASUVORK5CYII=',
        iconRetinaUrl: require('../../assets/images/logo.png'),
        className: '',
        prefix: '',
        glyph: 'gear-fill',
        glyphColor: 'white',
        glyphSize: '11px'
      })
    },
    iconMarker () {
      return L.divIcon({
        className: 'my-custom-pin',
        html: `${this.createSvg('emre', this.iconColor.color)} <img src="${this.iconColor.markerIcon}" class="markerIcon">`,
        iconSize: [35, 45],
        iconAnchor: [17, 45],
        popupAnchor: [1, -32],
        shadowAnchor: [10, 12],
        shadowSize: [36, 16]
      })
    },
    yellow_icon () {
      return L.divIcon({
        className: 'my-custom-pin',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="50" width="40">
                <g transform="translate(-814.59595,-274.38623)">
                  <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                    <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${this.iconColor.color};stroke:${this.iconColor.strokeColor};"/>
                    <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${this.iconColor.color};"/>
                  </g>
                </g>
              </svg>`
      })
    }
  },
  methods: {
    innerClick () {
      alert('Click!')
    }
  }
}
</script>

<style>
.color_yellow {
  color: blueviolet;
}
.markerIcon {
  width: 36px !important;
  margin-top: -80px !important;
  position: absolute;
  left: 1px;
}
</style>
