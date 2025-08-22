<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h1>

      <!-- Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-xl p-6 text-white">
          <h2 class="text-xl font-semibold mb-2">Total Events</h2>
          <p class="text-3xl font-bold">{{ totalEvents }}</p>
        </div>

        <div class="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl p-6 text-white">
          <h2 class="text-xl font-semibold mb-2">Speakers</h2>
          <p class="text-3xl font-bold">{{ totalSpeakers }}</p>
        </div>

        <div class="bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg rounded-xl p-6 text-white">
          <h2 class="text-xl font-semibold mb-2">Audience</h2>
          <p class="text-3xl font-bold">{{ totalAudience }}</p>
        </div>

        <div class="bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded-xl p-6 text-white">
          <h2 class="text-xl font-semibold mb-2">Conflicts</h2>
          <p class="text-3xl font-bold">{{ totalConflicts }}</p>
        </div>
      </div>

      <!-- Recent Events Table -->
      <div class="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Events</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
            <thead class="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">#</th>
                <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Event Name</th>
                <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Date</th>
                <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Time</th>
                <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ev, index) in recentEvents"
                :key="ev.id"
                class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
              >
                <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ index + 1 }}</td>
                <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.name }}</td>
                <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.date }}</td>
                <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.time }}</td>
                <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ ev.location }}</td>
              </tr>
              <tr v-if="recentEvents.length === 0">
                <td colspan="5" class="py-4 text-center text-gray-500 dark:text-gray-300">No recent events.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Dashboard',
  setup() {
    const totalEvents = ref(12)
    const totalSpeakers = ref(8)
    const totalAudience = ref(120)
    const totalConflicts = ref(2)

    const recentEvents = ref([
      { id: 1, name: 'Vue Workshop', date: '2025-08-22', time: '10:00', location: 'Room A' },
      { id: 2, name: 'JavaScript Meetup', date: '2025-08-23', time: '14:00', location: 'Room B' },
      { id: 3, name: 'Tech Talk', date: '2025-08-24', time: '09:00', location: 'Room C' }
    ])

    return { totalEvents, totalSpeakers, totalAudience, totalConflicts, recentEvents }
  }
}
</script>

<style scoped>
/* تأثير hover للصفوف */
tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.1);
  transition: background-color 0.3s;
}
</style>