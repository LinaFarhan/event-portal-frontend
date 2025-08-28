<template>
  <div :class="['flex items-center justify-center', sizeClass]">
    <div class="animate-spin rounded-full border-b-2 border-current" :class="loaderClass"></div>
    <span v-if="showText" class="mr-2 text-gray-600 dark:text-gray-400">جاري التحميل...</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  showText: Boolean
});

const sizeClass = {
  small: 'h-6',
  medium: 'h-12',
  large: 'h-16'
};

const loaderClass = {
  small: 'h-4 w-4',
  medium: 'h-8 w-8',
  large: 'h-12 w-12'
};
</script>