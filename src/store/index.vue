<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">Events Overview</h1>

      <!-- Chart Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Registrations Chart</h2>
        <canvas id="eventsChart"></canvas>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <img :src="event.image" :alt="event.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ event.name }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ event.date }} | {{ event.time }}</p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ event.location }}</p>
            <div class="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <button
                @click="viewDetails(event.id)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
              >
                Details
              </button>
              <button
                v-if="isAdmin"
                @click="editEvent(event.id)"
                class="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300 w-full sm:w-auto"
              >
                Edit
              </button>
              <button
                @click="registerEvent(event.id)"
                class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 w-full sm:w-auto"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div v-if="events.length === 0" class="col-span-full text-center text-gray-500 dark:text-gray-300">
          No events available.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'StoreEventsChart',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const isAdmin = ref(true)

    const events = ref([
      { id: 1, name: 'Vue Workshop', date: '2025-08-22', time: '10:00', location: 'Room A', image: 'https://via.placeholder.com/400x300?text=Vue+Workshop', registered: 35 },
      { id: 2, name: 'React Seminar', date: '2025-08-23', time: '14:00', location: 'Room B', image: 'https://via.placeholder.com/400x300?text=React+Seminar', registered: 50 },
      { id: 3, name: 'Angular Talk', date: '2025-08-24', time: '09:00', location: 'Room C', image: 'https://via.placeholder.com/400x300?text=Angular+Talk', registered: 20 }
    ])

    const viewDetails = id => router.push({ name: 'EventDetails', params: { id } })
    const editEvent = id => router.push({ name: 'EditEvent', params: { id } })
    const registerEvent = id => toast.success('You have registered for the event!')

    let chartInstance = null

    const renderChart = () => {
      const ctx = document.getElementById('eventsChart').getContext('2d')
      const isDark = document.documentElement.classList.contains('dark')
      const bgColor = isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(16, 185, 129, 0.7)'
      const borderColor = isDark ? 'rgba(59, 130, 246, 1)' : 'rgba(5, 150, 105, 1)'

      if (chartInstance) chartInstance.destroy()
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: events.value.map(e => e.name),
          datasets: [{
            label: 'Registered Users',
            data: events.value.map(e => e.registered),
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: isDark ? '#fff' : '#111' } }
          },
          scales: {
            x: { ticks: { color: isDark ? '#fff' : '#111' } },
            y: { ticks: { color: isDark ? '#fff' : '#111' }, beginAtZero: true }
          }
        }
      })
    }

    onMounted(() => renderChart())
    // إعادة رسم المخطط عند تغيير الوضع الداكن
    const observer = new MutationObserver(renderChart)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return { events, viewDetails, editEvent, registerEvent, isAdmin }
  }
}
</script>

<style scoped>
div > div:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}
</style>