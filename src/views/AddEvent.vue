<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Add New Event</h1>

      <form @submit.prevent="addEvent" class="space-y-5">
        <!-- الحقول كما كانت سابقاً -->
        ...
        <!-- Submit Button -->
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300"
          >
            Add Event
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
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'AddEvent',
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

    const addEvent = () => {
      console.log('New Event:', event.value)
      toast.success('Event added successfully!')
      event.value = { name: '', date: '', time: '', location: '', audience: '', speakers: [] }
    }

    const goBack = () => {
      router.push({ name: 'EventsOverview' }) // التنقل لصفحة EventsOverview
    }

    return { event, audiences, speakers, addEvent, goBack }
  }
}
</script>

<style scoped>
/* تأثير hover و focus كما كان سابقاً */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

select[multiple] {
  height: 120px;
  overflow-y: auto;
}
</style>