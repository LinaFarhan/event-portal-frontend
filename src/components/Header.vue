<template>
  <header class="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center shadow">
    <h1 class="text-xl font-bold">Event Management Portal</h1>
    <button @click="$emit('toggle-theme')" class="px-3 py-1 bg-blue-500 text-white rounded">
      تبديل الوضع
    </button>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>