<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h1 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">Audience Management</h1>

      <!-- Add New Audience -->
      <form @submit.prevent="addAudience" class="flex flex-col md:flex-row gap-4 mb-6">
        <input
          v-model="newAudience.name"
          type="text"
          placeholder="Audience Name"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          required
        />
        <input
          v-model="newAudience.email"
          type="email"
          placeholder="Email (optional)"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          type="submit"
          class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-colors duration-300"
        >
          Add
        </button>
      </form>

      <!-- Audience Table -->
      <div class="overflow-x-auto mb-6">
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
              v-for="(aud, index) in audiences"
              :key="aud.id"
              class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
            >
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ index + 1 }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ aud.name }}</td>
              <td class="py-2 px-4 text-gray-700 dark:text-gray-200">{{ aud.email }}</td>
              <td class="py-2 px-4">
                <button
                  @click="removeAudience(aud.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="audiences.length === 0">
              <td colspan="4" class="py-4 text-center text-gray-500 dark:text-gray-300">No audience added yet.</td>
            </tr>
          </tbody>
        </table>
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
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'Audience',
  setup() {
    const toast = useToast()
    const router = useRouter()

    const audiences = ref([
      { id: 1, name: 'Students', email: 'students@example.com' },
      { id: 2, name: 'Teachers', email: 'teachers@example.com' }
    ])

    const newAudience = ref({ name: '', email: '' })

    const addAudience = () => {
      const id = audiences.value.length
        ? Math.max(...audiences.value.map(a => a.id)) + 1
        : 1
      audiences.value.push({ id, ...newAudience.value })
      toast.success('Audience added successfully!')
      newAudience.value = { name: '', email: '' }
    }

    const removeAudience = id => {
      audiences.value = audiences.value.filter(a => a.id !== id)
      toast.info('Audience removed.')
    }

    const goBack = () => {
      router.push({ name: 'EventsOverview' })
    }

    return { audiences, newAudience, addAudience, removeAudience, goBack }
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