 <template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Export Data</h1>

      <p class="mb-4 text-gray-700 dark:text-gray-300">
        You can export all events and audience data in CSV format.
      </p>

      <div class="flex gap-4">
        <button
          @click="exportData"
          class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transition-transform transform hover:scale-105 duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4M12 4v8" />
          </svg>
          Export CSV
        </button>

        <button
          @click="uploadData"
          class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform transform hover:scale-105 duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v-8m0 8l-4-4m4 4l4-4" />
          </svg>
          Upload CSV
        </button>
      </div>

      <!-- Back Button -->
      <div class="mt-6 text-right">
        <button
          @click="goBack"
          class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Back to Events
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'ExportData',
  setup() {
    const router = useRouter()
    const toast = useToast()

    const exportData = () => {
      // محاكاة تصدير البيانات
      toast.success('Data exported successfully!')
    }

    const uploadData = () => {
      // محاكاة رفع البيانات
      toast.success('Data uploaded successfully!')
    }

    const goBack = () => {
      router.push({ name: 'EventsOverview' })
    }

    return { exportData, uploadData, goBack }
  }
}
</script>

<style scoped>
button svg {
  transition: transform 0.3s;
}
button:hover svg {
  transform: translateY(-2px);
}
</style>