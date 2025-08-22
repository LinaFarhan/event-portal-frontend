<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Speakers</h1>

      <!-- أزرار الإضافة والعودة -->
      <div class="mb-4 flex justify-between items-center">
        <button
          @click="goToAddSpeaker"
          class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform transform hover:scale-105 duration-300"
        >
          Add Speaker
        </button>

        <button
          @click="goBack"
          class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Back to Dashboard
        </button>
      </div>

      <!-- جدول المتحدثين -->
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">#</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Name</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Email</th>
              <th class="py-2 px-4 text-left text-gray-800 dark:text-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(speaker, index) in speakers"
              :key="speaker.id"
              class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
            >
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ index + 1 }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ speaker.name }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ speaker.email }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button
                  @click="editSpeaker(speaker.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  @click="deleteSpeaker(speaker.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="speakers.length === 0">
              <td colspan="4" class="py-4 text-center text-gray-500 dark:text-gray-300">No speakers found.</td>
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
  name: 'Speakers',
  setup() {
    const router = useRouter()
    const toast = useToast()

    const speakers = ref([])

    onMounted(() => {
      // محاكاة تحميل بيانات المتحدثين
      speakers.value = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    })

    const goToAddSpeaker = () => {
      router.push({ name: 'AddSpeaker' }) // صفحة لإضافة متحدث جديد
    }

    const editSpeaker = id => {
      router.push({ name: 'EditSpeaker', params: { id } })
    }

    const deleteSpeaker = id => {
      speakers.value = speakers.value.filter(sp => sp.id !== id)
      toast.info('Speaker deleted.')
    }

    const goBack = () => {
      router.push({ name: 'Dashboard' })
    }

    return { speakers, goToAddSpeaker, editSpeaker, deleteSpeaker, goBack }
  }
}
</script>

<style scoped>
tbody tr:hover {
  background-color: rgba(34, 197, 94, 0.1);
  transition: background-color 0.3s;
}
</style>