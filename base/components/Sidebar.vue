<script setup>
import { defineAsyncComponent, computed } from 'vue'
import NAVIGATION_CONFIG from '~/base/configs/nav'
import IconLogo from '~/assets/svg/logo.svg'
import XIcon from '~/assets/svg/x.svg'
import { useUserStore } from '~/store/user.store'

// Принимаем пропс isSidebarOpen
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
})

const store = useUserStore()
const emit = defineEmits(['toggle-sidebar'])

const iconComponents = computed(() =>
  NAVIGATION_CONFIG.filter((item) => !item.auth || store.isUserLogged).map((item) => ({
    ...item,
    iconComponent: defineAsyncComponent(() => import(`~/assets/svg/${item.icon}.svg`)),
  }))
)

const sidebarClass = computed(() => ({
  'sidebar-open': props.isSidebarOpen,
}))
</script>

<template>
  <div class="sidebar" :class="sidebarClass">
    <XIcon class="sidebar-close" @click="emit('toggle-sidebar')" />
    <div class="sidebar-header">
      <IconLogo class="icon" />
      <h1 class="sidebar-header-text">SubRadar</h1>
    </div>
    <nav>
      <ul class="sidebar-nav">
        <li v-for="(item, index) in iconComponents" :key="index">
          <NuxtLink :to="item.path" class="sidebar-nav-item" @click.native="emit('toggle-sidebar')">
            <component :is="item.iconComponent" class="sidebar-nav-icon" />
            <span class="sidebar-nav-text">{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- <div class="sidebar-logout">
      <LogoutIcon class="sidebar-logout-icon" />
      <span class="sidebar-logout-text">Выйти с аккаунта</span>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  left: -100%;
  top: 0;
  width: 310px;
  height: 100vh;
  padding-top: 66px;
  padding-left: 55px;
  background: $light-grey;
  transition: left 0.3s ease-in-out;
  z-index: 100;

  @media (max-width: $xs) {
    width: 100%;
  }

  &-open {
    left: 0;
  }

  &-close {
    display: none;

    @media (max-width: $xs) {
      display: block;
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }

  &-header {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 35px;
    padding-bottom: 115px;
    &-text {
      font-size: 40px;
      font-weight: 700;
      color: $main-text;
    }
  }

  &-nav {
    display: flex;
    flex-direction: column;
    gap: 28px;

    &-text {
      font-weight: 300;
      font-size: 20px;
      color: $main-text;
      transition: color 0.3s ease-in-out;
    }

    &-icon {
      transition: color 0.3s ease-in-out;
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 13px;
      color: $main-text;

      &:hover {
        .sidebar-nav-text,
        .sidebar-nav-icon {
          color: $purple;
        }
      }
    }
  }

  &-logout {
    display: flex;
    gap: 12.5px;
    align-items: center;
    font-weight: 300;
    font-size: 20px;
    position: absolute;
    bottom: 67px;
    left: 53px;
    transition: color 0.1s ease-in-out;

    &-text,
    &-icon {
      cursor: pointer;
      transition: color 0.1s ease-in-out;
    }

    &:hover {
      color: $purple;

      &-text,
      &-icon {
        color: $purple;
      }
    }
  }
}

.router-link-exact-active {
  .sidebar-nav-text {
    color: $purple !important;
  }
  .sidebar-nav-icon {
    color: $purple !important;
  }
}
</style>
