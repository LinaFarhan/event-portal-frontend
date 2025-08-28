<template>
  <footer class="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-center md:text-right">
          <p class="text-gray-600 dark:text-gray-400">
            &copy; {{ new Date().getFullYear() }} نظام إدارة الفعاليات. جميع الحقوق محفوظة.
          </p>
        </div>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            الشروط والأحكام
          </a>
          <a href="#" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            الخصوصية
          </a>
          <a href="#" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            الدعم
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>