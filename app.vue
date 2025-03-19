<script setup>
import { ref, computed } from 'vue'
import Sidebar from '~/base/components/Sidebar.vue'

const isSidebarOpen = ref(false)

const contentClass = computed(() => ({
  'content-shifted': isSidebarOpen.value,
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
    <!-- Боковая панель -->
    <Sidebar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Кнопка бургер -->
    <div class="sidebar-btn" @click="toggleSidebar">
      <div class="sidebar-btn-line"></div>
      <div class="sidebar-btn-line"></div>
      <div class="sidebar-btn-line"></div>
    </div>

    <!-- Контент -->
    <div class="content" :class="contentClass" @click="closeSidebar">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
  display: flex;
  max-height: 100vh;
  min-height: 100vh;
  transition: all 0.3s ease-in-out;
}

.sidebar-btn {
  position: absolute;
  top: 69px;
  left: 89px;
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
  flex-grow: 1;
  width: 100%;
  transition: margin-left 0.3s ease-in-out;
  padding: 68px 89px 67px 59px;
}

/* Когда меню открыто, сдвигаем контент */
.content-shifted {
  margin-left: 310px;
}

.router-link-exact-active {
  .sidebar-nav-text {
    color: $purple !important;
  }
}
</style>