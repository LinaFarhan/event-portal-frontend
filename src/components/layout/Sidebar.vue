<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen fixed right-0 top-0">
    <div class="p-4 border-b dark:border-gray-700">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white">القائمة</h2>
    </div>
    <nav class="p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <router-link 
            :to="item.to" 
            class="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            :class="{ 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300': $route.path === item.to }"
          >
            <span class="ml-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const menuItems = [
  { name: 'لوحة التحكم', to: '/' },
  { name: 'الفعاليات', to: '/events' },
  { name: 'المتحدثون', to: '/speakers' },
  { name: 'الحضور', to: '/audience' },
  { name: 'التقارير', to: '/export' },
  { name: 'الجدولة', to: '/schedule' },
  { name: 'الإعدادات', to: '/settings' }
   
];
</script>