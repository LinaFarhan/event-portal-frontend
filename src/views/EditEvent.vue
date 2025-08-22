<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Edit Event</h1>

      <form @submit.prevent="updateEvent" class="space-y-5">
        <!-- Event Name -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Event Name</label>
          <input
            v-model="event.name"
            type="text"
            placeholder="Enter event name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date</label>
            <input
              v-model="event.date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Time</label>
            <input
              v-model="event.time"
              type="time"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Location</label>
          <input
            v-model="event.location"
            type="text"
            placeholder="Enter location"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>

        <!-- Target Audience -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Target Audience</label>
          <select
            v-model="event.audience"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option v-for="aud in audiences" :key="aud.id" :value="aud.name">{{ aud.name }}</option>
          </select>
        </div>

        <!-- Speakers -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Speakers</label>
          <select
            v-model="event.speakers"
            multiple
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option v-for="sp in speakers" :key="sp.id" :value="sp.name">{{ sp.name }}</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300"
          >
            Update Event
          </button>

          <!-- زر العودة -->
          <button
            @click="goBack"
            type="button"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Back to Events
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'EditEvent',
  setup() {
    const toast = useToast()
    const router = useRouter()

    const event = ref({
      name: '',
      date: '',
      time: '',
      location: '',
      audience: '',
      speakers: []
    })

    const audiences = ref([
      { id: 1, name: 'Students' },
      { id: 2, name: 'Teachers' },
      { id: 3, name: 'Public' }
    ])

    const speakers = ref([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ])

    // محاكاة تحميل البيانات الحالية للفعالية
    onMounted(() => {
      event.value = {
        name: 'Vue Workshop',
        date: '2025-08-22',
        time: '10:00',
        location: 'Room A',
        audience: 'Students',
        speakers: ['John Doe']
      }
    })

    const updateEvent = () => {
      console.log('Updated Event:', event.value)
      toast.success('Event updated successfully!')
    }

    const goBack = () => {
      router.push({ name: 'EventsOverview' })
    }

    return { event, audiences, speakers, updateEvent, goBack }
  }
}
</script>

<style scoped>
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

select[multiple] {
  height: 120px;
  overflow-y: auto;
}

/* تأثير hover خفيف للصفوف */
div > div:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style>