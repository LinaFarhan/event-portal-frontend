<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Schedule Checker</h1>

      <div class="flex justify-between items-center mb-4">
        <button
          @click="updateSchedule"
          class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-transform transform hover:scale-105 duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v16h16V4H4zm4 4h8M8 12h8m-8 4h8" />
          </svg>
          Update Schedule
        </button>

        <button
          @click="goBack"
          class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Back to Events
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">#</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Event Name</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Date</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Time</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Location</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Conflict</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ev, index) in events"
              :key="ev.id"
              :class="ev.conflict ? 'bg-red-100 dark:bg-red-700' : 'odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700'"
            >
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ index + 1 }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.name }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.date }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.time }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.location }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">
                <span v-if="ev.conflict" class="font-semibold text-red-600 dark:text-red-200">Conflict</span>
                <span v-else class="text-green-600 dark:text-green-200 font-semibold">OK</span>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="6" class="py-4 text-center text-gray-500 dark:text-gray-300">No events scheduled.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'ScheduleChecker',
  setup() {
    const toast = useToast()
    const router = useRouter()

    const events = ref([])

    onMounted(() => {
      // محاكاة تحميل جدول الفعاليات
      events.value = [
        { id: 1, name: 'Vue Workshop', date: '2025-08-22', time: '10:00', location: 'Room A', conflict: false },
        { id: 2, name: 'React Seminar', date: '2025-08-22', time: '10:00', location: 'Room A', conflict: true },
        { id: 3, name: 'Angular Talk', date: '2025-08-23', time: '14:00', location: 'Room B', conflict: false }
      ]
    })

    const updateSchedule = () => {
      // محاكاة تحديث البيانات وفحص التعارض
      events.value = events.value.map(ev => ({
        ...ev,
        conflict: Math.random() < 0.3 // تعارض عشوائي للعرض فقط
      }))
      toast.success('Schedule updated!')
    }

    const goBack = () => {
      router.push({ name: 'EventsOverview' })
    }

    return { events, updateSchedule, goBack }
  }
}
</script>

<style scoped>
tbody tr:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style>