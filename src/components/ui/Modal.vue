<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" @click="close"></div>
        </div>

        <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-right align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <div class="mt-2">
            <slot></slot>
          </div>

          <div class="mt-4 flex space-x-2 space-x-reverse">
            <Button @click="close" variant="secondary">إلغاء</Button>
            <Button @click="$emit('confirm')" variant="primary">{{ confirmText }}</Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import Button from './Button.vue';

defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Modal Title'
  },
  confirmText: {
    type: String,
    default: 'تأكيد'
  }
});

const emit = defineEmits(['update:show', 'confirm']);

const close = () => {
  emit('update:show', false);
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>