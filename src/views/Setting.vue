<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Settings</h1>

      <div class="space-y-6">
        <!-- Theme Toggle -->
        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Theme</span>
          <button
            @click="toggleTheme"
            class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transition-colors duration-300"
          >
            {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
          </button>
        </div>

        <!-- Additional Settings Placeholder -->
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-200">
          <p>Additional settings can go here...</p>
        </div>

        <!-- Back Button -->
        <div class="text-right">
          <button
            @click="goBack"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Settings',
  setup() {
    const router = useRouter()
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    onMounted(() => {
      // قراءة الوضع من localStorage عند تحميل الصفحة
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
      }
    })

    const goBack = () => {
      router.push({ name: 'Dashboard' })
    }

    return { isDark, toggleTheme, goBack }
  }
}
</script>

<style scoped>
/* تأثير hover خفيف للبطاقات */
div > div:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style>