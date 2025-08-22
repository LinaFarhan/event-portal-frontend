<template>
  <header class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
    <!-- عنوان الصفحة -->
    <h1 class="text-xl font-bold text-gray-800 dark:text-white">
      لوحة التحكم
    </h1>

    <!-- عناصر التحكم -->
    <div class="flex items-center space-x-4">
      <!-- اسم المستخدم -->
      <span class="text-gray-700 dark:text-gray-200 font-medium">
        مرحباً، {{ userName }}
      </span>

      <!-- تبديل الوضع الداكن / الفاتح -->
      <button @click="toggleTheme"
              class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        {{ isDark ? "🌙" : "☀" }}
      </button>

      <!-- زر تسجيل الخروج -->
      <button @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
        تسجيل الخروج
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

// معلومات المستخدم
const userName = ref("");

// الوضع الداكن
const isDark = ref(document.documentElement.classList.contains("dark"));

// عند التحميل
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userName.value = user.username;
  }
});

// تبديل الوضع الداكن / الفاتح
const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// تسجيل الخروج
const handleLogout = () => {
  localStorage.removeItem("user");
  toast.success("تم تسجيل الخروج ✅");
  router.push("/login");
};
</script>

<style scoped>
/* أي تعديلات إضافية إذا أحببت */
</style>