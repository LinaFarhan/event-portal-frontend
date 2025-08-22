<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
    <div class="text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl max-w-md">
      <h1 class="text-6xl font-extrabold text-yellow-500 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Page Not Found</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        @click="goBack"
        class="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Notfound',
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.push({ name: 'Dashboard' })
    }

    return { goBack }
  }
}
</script>

<style scoped>
h1 {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>