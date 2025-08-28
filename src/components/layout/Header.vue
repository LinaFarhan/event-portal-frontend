<template>
  <header class="bg-white dark:bg-gray-800 shadow-md" :class="headerClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <button @click="toggleSidebar" class="p-2 mr-4 rounded-md bg-gray-200 dark:bg-gray-700 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            نظام إدارة الفعاليات
          </h1>
        </div>
        
        <nav class="hidden md:flex space-x-4">
          <router-link
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.to"
            class="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md"
            active-class="text-primary font-bold"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <button @click="toggleHeader" class="p-2 rounded-full bg-blue-500 dark:bg-gray-700" title إخفاء الرأس>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button @click="toggleDarkMode" class="p-2 rounded-full bg-blue-500 dark:bg-gray-700">
            <span v-if="isDark">🌙</span>
            <span v-else>☀</span>
          </button>
   <button @click="goLogin" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    تسجيل الخروج
  </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
 

const navigation = [
  { name: 'الفعاليات', to: '/events' },
  { name: 'المتحدثون', to: '/speakers' },
  { name: 'الحضور', to: '/audience' },
  { name: 'التصدير', to: '/export' },
  { name: 'الجدولة', to: '/schedule' },
  { name: 'الإعدادات', to: '/settings' },
    
];

const props = defineProps({
  toggleSidebar: Function,
  sidebarVisible: Boolean
});

const emit = defineEmits(['toggle-header']);

const toggleHeader = () => {
  emit('toggle-header');
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('darkMode', isDark.value);
};

const headerClass = computed(() => {
  return props.sidebarVisible ? '' : 'w-full';
});

 

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode) {
    isDark.value = savedMode === 'true';
    document.documentElement.classList.toggle('dark', isDark.value);
  }
});
  /* methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  } */

</script>