<template>
  <button 
    :type="type" 
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    @click="$emit('click')"
  >
    <span v-if="loading" class="animate-spin mr-2">⟳</span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  disabled: Boolean,
  loading: Boolean
});

defineEmits(['click']);

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
  success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500'
};

const sizeClasses = {
  small: 'text-sm px-3 py-1',
  medium: 'text-base px-4 py-2',
  large: 'text-lg px-6 py-3'
};
</script>