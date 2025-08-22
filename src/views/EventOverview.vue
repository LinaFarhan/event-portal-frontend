<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Events Overview</h1>

      <!-- زر إضافة فعالية -->
      <div class="mb-4 flex justify-between items-center">
        <button
          @click="goToAddEvent"
          class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300"
        >
          Add New Event
        </button>

        <!-- زر العودة لصفحة Dashboard -->
        <button
          @click="goBack"
          class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Back to Dashboard
        </button>
      </div>

      <!-- جدول الفعاليات -->
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">#</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Name</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Date</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Time</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Location</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ev, index) in events"
              :key="ev.id"
              class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
            >
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ index + 1 }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.name }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.date }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.time }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.location }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button
                  @click="editEvent(ev.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  @click="viewEvent(ev.id)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  View
                </button>
                <button
                  @click="deleteEvent(ev.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="6" class="py-4 text-center text-gray-500 dark:text-gray-300">No events found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'EventsOverview',
  setup() {
    const router = useRouter()
    const toast = useToast()

    const events = ref([])

    onMounted(() => {
      // محاكاة تحميل بيانات الفعاليات
      events.value = [
        { id: 1, name: 'Vue Workshop', date: '2025-08-22', time: '10:00', location: 'Room A' },
        { id: 2, name: 'React Seminar', date: '2025-08-23', time: '14:00', location: 'Room B' }
      ]
    })

    const goToAddEvent = () => {
      router.push({ name: 'AddEvent' })
    }

    const editEvent = id => {
      router.push({ name: 'EditEvent', params: { id } })
    }

    const viewEvent = id => {
      router.push({ name: 'EventDetails', params: { id } })
    }

    const deleteEvent = id => {
      events.value = events.value.filter(ev => ev.id !== id)
      toast.info('Event deleted.')
    }

    const goBack = () => {
      router.push({ name: 'Dashboard' })
    }

    return { events, goToAddEvent, editEvent, viewEvent, deleteEvent, goBack }
  }
}
</script>

<style scoped>
tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.1);
  transition: background-color 0.3s;
}
</style>