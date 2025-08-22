<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />

      <!-- محتوى الصفحات -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
 
</script>

<style>
 
</style>