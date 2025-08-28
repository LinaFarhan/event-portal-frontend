<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="flex items-center mb-6">
   
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">تفاصيل الفعالية</h2>
    </div>

    <Loader v-if="loading" class="text-center py-12" />
    
    <div v-else class="card">
      <div class="flex justify-between items-start mb-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ event.title }}</h3>
        <span class="px-3 py-1 text-sm rounded-full" :class="categoryClass">
          {{ event.category }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">التاريخ والوقت</h4>
          <p class="text-lg text-gray-900 dark:text-white">
            {{ formatDate(event.date) }} - {{ event.time }}
          </p>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">المكان</h4>
          <p class="text-lg text-gray-900 dark:text-white">{{ event.location }}</p>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">الوصف</h4>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ event.description }}</p>
      </div>

      <div class="flex justify-end space-x-2 space-x-reverse">
        <Button variant="secondary" @click="$router.back()">رجوع</Button>
        <Button @click="editEvent">تعديل</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Loader from '../components/ui/Loader.vue';
import { eventService } from '../services/events';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const event = ref({});

const categoryClass = {
  'مؤتمر': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'ورشة عمل': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'ندوة': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'default': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

onMounted(async () => {
  try {
    const response = await eventService.getEvent(route.params.id);
    event.value = response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    alert('حدث خطأ أثناء تحميل الفعالية');
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const editEvent = () => {
  router.push('/events/edit/${route.params.id}');
};
</script>