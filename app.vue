<script setup>
import { ref, computed } from 'vue'
import Sidebar from '~/base/components/Sidebar.vue'
import Button
 from './base/ui/Button.vue'
const isSidebarOpen = ref(false)

const appMainClass = computed(() => ({
  'app-main-shifted': isSidebarOpen.value,
}))

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (isSidebarOpen.value) isSidebarOpen.value = false
}
</script>

<template>
  <div class="app">
    <Sidebar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="app-main" :class="appMainClass" @click.stop="closeSidebar">
      <header class="header">
        <div class="sidebar-btn" v-if="!isSidebarOpen" @click.stop="toggleSidebar">
          <div class="sidebar-btn-line"></div>
          <div class="sidebar-btn-line"></div>
          <div class="sidebar-btn-line"></div>
        </div>
        <div class="header-menu">
          <Button>Войти</Button>
        </div>
      </header>

      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 44px;

  &-menu{
    margin-left: auto;
  }
}

.app {
  position: relative;
  display: flex;
  max-height: 100vh;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1920px;
  transition: all 0.3s ease-in-out;

  &-main {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 40px 89px;
    overflow: auto;
  }
}

.sidebar-btn {
  display: flex;
  flex-direction: column;
  width: 55px;
  height: max-content;
  gap: 8px;
  cursor: pointer;

  &-line {
    height: 8px;
    width: 100%;
    background: $main-text;
    border-radius: 3px;
  }
}

/* Контент */
.content {
  width: 100%;
  transition: margin-left 0.3s ease-in-out;
  padding: 40px 0px 0 0;
}

/* Когда меню открыто, сдвигаем контент */
.app-main-shifted {
  margin-left: 310px;
  width: calc(100% - 310px);
}


</style>
