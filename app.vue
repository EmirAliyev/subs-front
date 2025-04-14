<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '~/base/components/Sidebar.vue'
import { NConfigProvider } from 'naive-ui'
import Auth from './base/components/Auth.vue'
import { useHead } from '#imports'

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

const themeOverrides = {
  common: {
    primaryColor: '#5F229A',
    primaryColorHover: '#5F229A',
  },
}

// Добавление метатега для Яндекс.Вебмастера
useHead({
  title: 'Подписки и расходы — Управляй своими сервисами',
  meta: [
    { name: 'yandex-verification', content: 'b9a3f781a43f2858' },
    { name: 'google-site-verification', content: '0CYPZzMVfsQvj_-MULPjI1V_ljWc4wfsVcgM-3uW6KI' },
    {
      name: 'description',
      content:
        'Сравнивай цены, отслеживай подписки и контролируй расходы на сервисы — всё в одном месте.',
    },
    {
      name: 'keywords',
      content:
        'подписки, управление подписками, цены на подписки, сравнение сервисов, расходы, финансы, бюджет',
    },
    {
      property: 'og:title',
      content: 'Подписки и расходы — Управляй своими сервисами',
    },
    {
      property: 'og:description',
      content:
        'Узнай, сколько ты тратишь на подписки и как меняются их цены. Веди бюджет эффективно.',
    },
    {
      property: 'og:image',
      content: './public/images/subradar.png',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://subradar.ru',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://subradar.ru',
    },
  ],
})

// 👇 Метрика
onMounted(() => {
  ;(function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    m[i].l = 1 * new Date()
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return
    }
    ;(k = e.createElement(t)), (a = e.getElementsByTagName(t)[0])
    k.async = 1
    k.src = r
    a.parentNode?.insertBefore(k, a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

  window.ym?.(101028889, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  })
})
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
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
            <ClientOnly>
              <Auth />
            </ClientOnly>
          </div>
        </header>

        <div class="content">
          <NuxtPage />
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 44px;

  @media (max-width: $md) {
    align-items: center;
  }

  &-menu {
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

    @media (max-width: $xl) {
      padding: 40px 50px;
    }

    @media (max-width: $sm) {
      padding: 32px 24px;
    }

    @media (max-width: 365px) {
      padding: 28px 16px;
    }
  }
}

.sidebar-btn {
  display: flex;
  flex-direction: column;
  width: 55px;
  height: max-content;
  gap: 8px;
  cursor: pointer;

  @media (max-width: $sm) {
    width: 32px;
    gap: 6px;
  }

  &-line {
    height: 8px;
    width: 100%;
    background: $main-text;
    border-radius: 3px;

    @media (max-width: $sm) {
      height: 5px;
    }
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

  @media (max-width: $md) {
    margin-left: 0;
    width: 100%;
  }
}
</style>
