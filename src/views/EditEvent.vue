<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="flex items-center mb-6">
   
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">تعديل الفعالية</h2>
    </div>

    <Loader v-if="loading" class="text-center py-12" />
    
    <form v-else @submit.prevent="submitForm" class="card space-y-6">
      <!-- نفس محتوى AddEvent.vue -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عنوان الفعالية</label>
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.title }"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <!-- باقي الحقول مشابه لـ AddEvent.vue -->

      <div class="flex justify-end space-x-2 space-x-reverse">
        <Button type="button" variant="secondary" @click="$router.back()">إلغاء</Button>
        <Button type="submit" :loading="updating">تحديث الفعالية</Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Loader from '../components/ui/Loader.vue';
import { validateEvent } from '../utils/validation';
import { eventService } from '../services/events';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const updating = ref(false);
const errors = ref({});

const formData = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'مؤتمر'
});

onMounted(async () => {
  try {
    const response = await eventService.getEvent(route.params.id);
    formData.value = response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    alert('حدث خطأ أثناء تحميل الفعالية');
  } finally {
    loading.value = false;
  }
});

const submitForm = async () => {
  const validation = validateEvent(formData.value);
  
  if (!validation.isValid) {
    errors.value = validation.errors;
    return;
  }

  errors.value = {};
  updating.value = true;

  try {
    await eventService.updateEvent(route.params.id, formData.value);
    router.push('/events');
  } catch (error) {
    console.error('Error updating event:', error);
    alert('حدث خطأ أثناء تحديث الفعالية');
  } finally {
    updating.value = false;
  }
};
</script>