 <template>
 
  <div v-if="isLoginPage" class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <router-view />
  </div>
  
  <!-- عرض الهيكل الكامل للصفحات الأخرى -->
  <div v-else class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <Sidebar :class="{'hidden': !showSidebar}" />
    <div class="flex-1 flex flex-col transition-all duration-300" :class="{'md:mr-64': showSidebar}">
      <Header :class="{'hidden': !showHeader}" :toggle-sidebar="toggleSidebar" :sidebar-visible="showSidebar" />
      <main class="flex-1 p-4">
        <div class="flex space-x-2 mb-4" v-if="!showHeader">
          <button @click="showHeader = true" class="p-2 bg-blue-500 text-white rounded">
            إظهار الرأس
          </button>
          <button @click="toggleSidebar" class="p-2 bg-green-500 text-white rounded">
            {{ showSidebar ? 'إخفاء القائمة' : 'إظهار القائمة' }}
          </button>
        </div>
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/layout/Header.vue'
import Sidebar from './components/layout/Sidebar.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()
const showSidebar = ref(true)
const showHeader = ref(true)

// التحقق مما إذا كان المسار الحالي هو صفحة تسجيل الدخول
const isLoginPage = computed(() => route.name === 'Login')

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const toggleHeader = () => {
  showHeader.value = !showHeader.value
}

// إخفاء الهيدر والسايدبار تلقائياً عند دخول صفحة التسجيل
watch(isLoginPage, (newVal) => {
  if (newVal) {
    showHeader.value = false
    showSidebar.value = false
  } else {
    showHeader.value = true
    showSidebar.value = true
  }
})

provide('toggleSidebar', toggleSidebar)
provide('toggleHeader', toggleHeader)
</script>
