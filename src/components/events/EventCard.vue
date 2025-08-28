<template>
  <div class="card">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ event.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ formatDate(event.date) }} - {{ event.time }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ event.location }}
        </p>
      </div>
      <span class="px-2 py-1 text-xs rounded-full" :class="categoryClass">
        {{ event.category }}
      </span>
    </div>
    
    <p class="text-gray-700 dark:text-gray-300 mt-3">
      {{ truncateDescription(event.description) }}
    </p>
    
    <div class="flex justify-end space-x-2 mt-4">
      <button @click="$emit('viewDetails', event.id)" class="btn-primary text-sm p-4">
        التفاصيل
      </button>
      <button @click="$emit('edit', event.id)" class="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-3 rounded">
        تعديل
      </button>
      <button @click="$emit('delete', event.id)" class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded">
        حذف
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
});

defineEmits(['viewDetails', 'edit', 'delete']);

const categoryClass = {
  'مؤتمر': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'ورشة عمل': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'ندوة': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'default': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-SA');
};

const truncateDescription = (description) => {
  if (!description) return '';
  return description.length > 100 ? description.substring(0, 100) + '...' : description;
};
</script>