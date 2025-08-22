<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Event Details</h1>

      <div class="space-y-4">
        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Event Name:</span>
          <span class="text-gray-900 dark:text-gray-100">{{ event.name }}</span>
        </div>

        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Date:</span>
          <span class="text-gray-900 dark:text-gray-100">{{ event.date }}</span>
        </div>

        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Time:</span>
          <span class="text-gray-900 dark:text-gray-100">{{ event.time }}</span>
        </div>

        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Location:</span>
          <span class="text-gray-900 dark:text-gray-100">{{ event.location }}</span>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Target Audience:</span>
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="(aud, index) in event.audience"
              :key="index"
              class="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {{ aud }}
            </span>
          </div>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span class="font-medium text-gray-700 dark:text-gray-200">Speakers:</span>
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="(sp, index) in event.speakers"
              :key="index"
              class="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 px-3 py-1 rounded-full text-sm"
            >
              {{ sp }}
            </span>
          </div>
        </div>

        <!-- Back Button -->
        <div class="text-right">
          <button
            @click="goBack"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Back to Events
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
  name: 'EventDetails',
  setup() {
    const router = useRouter()

    const event = ref({
      name: '',
      date: '',
      time: '',
      location: '',
      audience: [],
      speakers: []
    })

    onMounted(() => {
      // محاكاة تحميل بيانات الفعالية
      event.value = {
        name: 'Vue Workshop',
        date: '2025-08-22',
        time: '10:00',
        location: 'Room A',
        audience: ['Students', 'Teachers'],
        speakers: ['John Doe', 'Jane Smith']
      }
    })

    const goBack = () => {
      router.push({ name: 'EventsOverview' }) // العودة لصفحة الأحداث
    }

    return { event, goBack }
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