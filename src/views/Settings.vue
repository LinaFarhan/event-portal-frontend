<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">الإعدادات</h2>
    
    <div class="card mb-6">
      <h3 class="text-lg font-semibold mb-4">الإعدادات العامة</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المنظمة</label>
          <input v-model="settings.organization" type="text" class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
          <input v-model="settings.email" type="email" class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
          <input v-model="settings.phone" type="tel" class="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <h3 class="text-lg font-semibold mb-4">إعدادات المظهر</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span>الوضع الداكن</span>
          <button 
            @click="toggleDarkMode" 
            class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            :class="{ 'bg-blue-600': settings.darkMode }"
          >
            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="{ 'translate-x-6': settings.darkMode, 'translate-x-1': !settings.darkMode }" />
          </button>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اللون الرئيسي</label>
          <input v-model="settings.primaryColor" type="color" class="w-12 h-12 rounded" />
        </div>
      </div>
    </div>

    <div class="card mb-6">
      <h3 class="text-lg font-semibold mb-4">إعدادات الإشعارات</h3>
      <div class="space-y-2">
        <label class="flex items-center">
          <input v-model="settings.notifications.email" type="checkbox" class="rounded" />
          <span class="mr-2">الإشعارات عبر البريد الإلكتروني</span>
        </label>
        <label class="flex items-center">
          <input v-model="settings.notifications.sms" type="checkbox" class="rounded" />
          <span class="mr-2">الإشعارات عبر الرسائل النصية</span>
        </label>
        <label class="flex items-center">
          <input v-model="settings.notifications.reminders" type="checkbox" class="rounded" />
          <span class="mr-2">تذكير قبل الفعاليات</span>
        </label>
      </div>
    </div>

    <div class="flex justify-end">
      <Button @click="saveSettings" :loading="saving">حفظ الإعدادات</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from '../components/ui/Button.vue';

const saving = ref(false);
const settings = ref({
  organization: 'مؤسسة شباب سبا',
  email: 'shiba@organization.com',
  phone: '0456878876',
  darkMode: false,
  primaryColor: '#3b82f6',
  notifications: {
    email: true,
    sms: false,
    reminders: true
  }
});

onMounted(() => {
  loadSettings();
});

const loadSettings = () => {
  const saved = localStorage.getItem('appSettings');
  if (saved) {
    settings.value = { ...settings.value, ...JSON.parse(saved) };
  }
  // تطبيق الوضع الداكن إذا كان مفعلاً
  if (settings.value.darkMode) {
    document.documentElement.classList.add('dark');
  }
};

const saveSettings = () => {
  saving.value = true;
  localStorage.setItem('appSettings', JSON.stringify(settings.value));
  setTimeout(() => {
    saving.value = false;
    alert('تم حفظ الإعدادات بنجاح');
  }, 1000);
};

const toggleDarkMode = () => {
  settings.value.darkMode = !settings.value.darkMode;
  document.documentElement.classList.toggle('dark', settings.value.darkMode);
};
</script>