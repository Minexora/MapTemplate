<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <b-sidebar
    ref="_sidebar"
    :visible="isShow"
    :right="position === 'right'"
    @change="changeSidebar"
    sidebar-class="custom-body"
    no-header
    shadow
  >
    <template #default="{  }">
      <car-list
        class="mt-4"
        v-if="content === 1"
      />

      <div
        v-if="content === 2"
        class="sidebar"
        :style="cssVars"
      >
        <div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
          <div
            id="my-scroll"
            style="margin: 6px 14px 0 14px;"
          >
            <ul
              class="nav-list"
              style="overflow: visible; padding-left: 0px;"
            >

              <span
                v-for="(menuItem, index) in menuItems"
                :key="index"
              >
                <li>
                  <a @click="showModal(menuItem.type)">
                    <img
                      :src='menuItem.icon'
                      class="icon"
                    />
                    <span class="links_name">{{ menuItem.name }}</span>
                  </a>
                </li>
              </span>
            </ul>
          </div>
        </div>
        <b-modals
          :isShow.sync="modal"
          :size="modalData.size"
          :type="modalData.type"
          :title="modalData.title"
          :okOnly="modalData.okOnly"
        />
      </div>

    </template>

    <template
      v-if="content === 3"
      #footer="{  }"
    >
      <div class="d-flex custom-footer text-light align-items-center px-3 py-2">
        <div class="row">
          <div class="col col-12 col-md-3 d-flex align-items-center justify-content-center">
            <img
              :src='userData.icon'
              class="img-fluid rounded-start col col-4 col-md-12"
            >
          </div>
          <div class="col col-12 col-md-7 d-flex align-items-center justify-content-left">
            <div class="row">
              <div class="col col-12 col-md-12">
                <h4>{{userData.username}}</h4>
              </div>
              <div class="col col-12 col-md-12"><small>{{userData.userType}}</small></div>
            </div>
          </div>
          <div class="col col-12 col-md-1 d-flex align-items-center justify-content-left">
            <b-dropdown
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-gear" viewBox="0 0 16 16" @click="logout">
                          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg> -->
                <b-icon
                  class="custom-control-exit"
                  icon="lock-fill"
                  @click="logout"
                ></b-icon>
              </template>
              <!-- <b-dropdown-item href="#">Action</b-dropdown-item>
                      <b-dropdown-item href="#">Another action</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>-->
              <!-- <b-dropdown-item class="custom-exit" variant="danger" @click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                          <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        Çıkış
                      </b-dropdown-item> -->
            </b-dropdown>

          </div>
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { BSidebar } from 'bootstrap-vue'
import ModalComponent from '@/components/ModalComponent.vue'
import CarListComponent from '@/components/Cars/CarListComponent.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  components: {
    'b-sidebar': BSidebar,
    'b-modals': ModalComponent,
    // eslint-disable-next-line vue/no-unused-components
    'car-list': CarListComponent
  },
  data () {
    return {
      modal: false,
      isShow: false,
      title: '',
      content: '',
      position: '',
      userData: {
        icon: require('@/assets/images/user.png'),
        username: '',
        userType: ''
      },
      modalData: {
        title: '',
        type: '',
        size: 'xl',
        okOnly: false
      },
      menuItems: [
        {
          type: 'home',
          icon: require('@/assets/images/report (1).png'),
          name: 'Anasayfa'
        },
        {
          type: 'vehicle_fence',
          icon: require('@/assets/images/report (1).png'),
          name: 'Araç Fence Raporu'
        },
        {
          type: 'fence',
          icon: require('@/assets/images/report (3).png'),
          name: 'Fence Raporu'
        },
        {
          type: 'distance',
          icon: require('@/assets/images/distance1.png'),
          name: 'Araç Distance Raporu'
        },
        {
          type: 'history',
          icon: require('@/assets/images/expedition.png'),
          name: 'Geçmiş İzleme'
        }
      ]
    }
  },
  created () {
    this.getUserData()
  },
  computed: {
    getSidebarData () {
      return this.$store.getters['sidebar/get_sidebarData']
    },
    cssVars () {
      return {
        // '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
        '--bg-color': '#11101d',
        '--secondary-color': '#1d1b31',
        '--home-section-color': '#e4e9f7',
        '--logo-title-color': '#fff',
        '--icons-color': '#fff',
        '--items-tooltip-color': '#fff',
        '--menu-items-hover-color': '#fff',
        '--menu-items-text-color': '#fff',
        '--menu-footer-text-color': '#fff'
      }
    }
  },
  watch: {
    getSidebarData (newData, oldData) {
      this.isShow = newData.isShow
      this.title = newData.title
      this.content = newData.content
      this.position = newData.position
    }
  },
  methods: {
    changeSidebar (newVal) {
      this.$store.commit('sidebar/set_sidebarData', {
        isShow: newVal,
        title: this.title,
        content: this.content,
        position: this.position
      })
    },
    showModal (type) {
      this.modal = true
      if (type === 'vehicle_fence') {
        this.modalData.title = 'Araç Fence Raporu'
        this.modalData.type = type
        this.modalData.okOnly = true
      } else if (type === 'fence') {
        this.modalData.title = 'Fence Raporu'
        this.modalData.type = type
        this.modalData.okOnly = true
      } else if (type === 'distance') {
        this.modalData.title = 'Araç Distance Raporu'
        this.modalData.type = type
        this.modalData.okOnly = true
      } else if (['history', 'home'].includes(type)) {
        this.modal = false
        this.$router.push({ name: type }).catch((err) => {
          console.log(err)
        })
      }
    },
    getUserData () {
      const allUserType = this.$store.getters['auth/get_userTypeList']
      this.userData.username = this.$store.getters['auth/get_username']
      const userType = this.$store.getters['auth/get_userType']
      this.userData.userType = allUserType[userType]
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'login' }).catch((err) => console.log(err))
    }
  }
}
</script>

<style lang="scss">
.b-sidebar-outer .custom-body {
  font-size: 16px;
  color: white !important;
  width: 420px !important;
  height: 88%;
  background-color: rgba(47, 64, 80, 0.9) !important;
}
.close {
  $size: 45px;
  $borderSize: 2px;
  $borderColor: rgba(white, 1);
  $speed: 0.5s;
  width: $size;
  height: $size;
  position: relative;
  background: #455a64;
  border-radius: 50%;
  box-shadow: 0 0 20px -5px rgba(white, 0.5);
  transition: 0.25s ease-in-out;
  cursor: pointer;
  animation: fade-in $speed ease-out 0.25s both;
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(1.1);
    }
  }
  .circle {
    path {
      stroke: $borderColor;
      fill: none;
      stroke-width: $borderSize/2;
      stroke-linecap: round;
      animation: progress $speed ease-out 0.25s both;
      @keyframes progress {
        from {
          stroke-dasharray: 0 100;
        }
      }
    }
  }
  span {
    display: block;
    width: ($size/4) - 2px;
    height: $borderSize;
    background: $borderColor;
    box-shadow: 0 0 20px -5px rgba(white, 0.5);
    border-radius: 20px;
    position: absolute;
    $padding: $size/3;
    transition: 0.25s ease-in-out;
    animation: slide-in $speed ease-in-out 0.25s both;
    @keyframes slide-in {
      from {
        width: 0;
      }
    }
    &:nth-child(1) {
      top: ($padding - ($borderSize/2));
      left: $padding;
      transform: rotate(45deg);
      transform-origin: top left;
    }
    &:nth-child(2) {
      top: ($padding - ($borderSize/2));
      right: $padding;
      transform: rotate(-45deg);
      transform-origin: top right;
    }
    &:nth-child(3) {
      bottom: ($padding - ($borderSize/2));
      left: $padding;
      transform: rotate(-45deg);
      transform-origin: bottom left;
    }
    &:nth-child(4) {
      bottom: ($padding - ($borderSize/2));
      right: $padding;
      transform: rotate(45deg);
      transform-origin: bottom right;
    }
  }
  &:hover {
    background: #37474f;
    span {
      width: ($size/4);
    }
  }
}
.custom-footer {
  border: 1px solid white;
  height: 90px;
}

.custom-exit {
  border: 1px solid white;
  height: 30px;
}

.custom-control-exit {
  right: 20px;
  margin-right: 0px;
  font-size: 21px;
  color: rgb(253, 111, 9);
  width: 35px;
  background-color: rgba(47, 64, 80, 0.9);
  border-radius: 20px 0px 0px 20px;
}

.sidebar .icon {
  color: var(--icons-color);
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  /* margin-bottom: 60px; */
  /* height: 100%; */
  /* min-height: min-content; */
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: var(--bg-color);
}
.sidebar li a:hover {
  background: var(--menu-items-hover-color);
}
.sidebar li a .links_name {
  color: var(--menu-items-text-color);
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name {
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover .icon {
  transition: all 0.5s ease;
  color: var(--bg-color);
}
.sidebar li .icon {
  height: 58px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
  padding: 12px;
}
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}
</style>
