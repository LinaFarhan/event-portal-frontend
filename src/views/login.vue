<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-6 bg-white rounded-2xl shadow dark:bg-gray-800">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        تسجيل الدخول
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Username -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">اسم المستخدم</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          دخول
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const username = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

const handleLogin = () => {
  // بيانات تجريبية (Admin, User)
  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "user", password: "123", role: "user" },
  ];

  const foundUser = users.find(
    (u) => u.username === username.value && u.password === password.value
  );

  if (foundUser) {
    // تخزين بيانات المستخدم في localStorage
    localStorage.setItem("user", JSON.stringify(foundUser));
    toast.success("تم تسجيل الدخول بنجاح ✅");
    router.push("/dashboard");
  } else {
    toast.error("اسم المستخدم أو كلمة المرور غير صحيحة ❌");
  }
};
</script>