<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="flex items-center mb-6">
     
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">إضافة فعالية جديدة</h2>
       
    </div>

    <form @submit.prevent="submitForm" class="card space-y-6">
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

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
        <textarea
          v-model="formData.description"
          id="description"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">التاريخ</label>
          <input
            v-model="formData.date"
            type="date"
            id="date"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            :class="{ 'border-red-500': errors.date }"
          />
          <p v-if="errors.date" class="text-red-500 text-sm mt-1">{{ errors.date }}</p>
        </div>

        <div>
          <label for="time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوقت</label>
          <input
            v-model="formData.time"
            type="time"
            id="time"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            :class="{ 'border-red-500': errors.time }"
          />
          <p v-if="errors.time" class="text-red-500 text-sm mt-1">{{ errors.time }}</p>
        </div>
      </div>

      <div>
        <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المكان</label>
        <input
          v-model="formData.location"
          type="text"
          id="location"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          :class="{ 'border-red-500': errors.location }"
        />
        <p v-if="errors.location" class="text-red-500 text-sm mt-1">{{ errors.location }}</p>
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">التصنيف</label>
        <select
          v-model="formData.category"
          id="category"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="مؤتمر">مؤتمر</option>
          <option value="ورشة عمل">ورشة عمل</option>
          <option value="ندوة">ندوة</option>
          <option value="محاضرة">محاضرة</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 space-x-reverse">
        <Button type="button" variant="secondary" @click="$router.back()">إلغاء</Button>
        <Button type="submit" :loading="loading">إضافة الفعالية</Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/ui/Button.vue';
import { validateEvent } from '../utils/validation';
import { eventService } from '../services/events';

const router = useRouter();
const loading = ref(false);
const errors = ref({});

const formData = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'مؤتمر'
});

const submitForm = async () => {
  const validation = validateEvent(formData.value);
  
  if (!validation.isValid) {
    errors.value = validation.errors;
    return;
  }

  errors.value = {};
  loading.value = true;

  try {
    await eventService.createEvent(formData.value);
    router.push('/events');
  } catch (error) {
    console.error('Error adding event:', error);
    alert('حدث خطأ أثناء إضافة الفعالية');
  } finally {
    loading.value = false;
  }
};
</script>