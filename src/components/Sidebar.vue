<template>
  <aside
    class="w-64 bg-white dark:bg-gray-900 min-h-screen p-4 shadow-lg"
    v-if="isLoggedIn"
  >
    <nav class="space-y-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-3 py-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        :class="{ 'bg-gray-300 dark:bg-gray-700 font-bold': isActive(item.path) }"
      >
        <span class="mr-2">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// بيانات المستخدم
const user = ref(null);
const isLoggedIn = ref(false);

onMounted(() => {
  const u = JSON.parse(localStorage.getItem("user"));
  if (u) {
    user.value = u;
    isLoggedIn.value = true;
  }
});

// قائمة الروابط
const menuItems = [
  { name: "Dashboard", label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "EventsOverview", label: "الفعاليات", path: "/events", icon: "📅" },
  { name: "AddEvent", label: "إضافة فعالية", path: "/events/add", icon: "➕" },
  { name: "Speakers", label: "المتحدثين", path: "/speakers", icon: "🎤" },
  { name: "Audience", label: "الجمهور", path: "/audience", icon: "👥" },
  { name: "ExportData", label: "تصدير البيانات", path: "/export", icon: "📤" },
  { name: "ScheduleChecker", label: "فحص الجدول", path: "/schedule", icon: "🗓" },
  { name: "Settings", label: "الإعدادات", path: "/settings", icon: "⚙" },
];

// التحقق من الرابط الحالي لتحديد العنصر النشط
const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
/* أي تعديلات إضافية حسب الحاجة */
</style>