<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      مدقق الجدولة
    </h2>

    <div class="card mb-8">
      <h3 class="text-lg font-semibold mb-4">التحقق من التعارضات</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >التاريخ</label
          >
          <input
            type="date"
            v-model="checkDate"
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >الوقت</label
          >
          <input
            type="time"
            v-model="checkTime"
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      <Button @click="checkConflicts">تحقق من التعارضات</Button>
    </div>

    <div v-if="conflicts.length > 0" class="card">
      <h3 class="text-lg font-semibold text-red-600 mb-4">تم اكتشاف تعارضات</h3>
      <div
        v-for="conflict in conflicts"
        :key="conflict.id"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-2"
      >
        <p class="text-red-800 dark:text-red-200 font-semibold">
          {{ conflict.title }}
        </p>
        <p class="text-red-600 dark:text-red-300">
          {{ conflict.date }} - {{ conflict.time }}
        </p>
        <p class="text-red-600 dark:text-red-300">{{ conflict.location }}</p>
      </div>
    </div>

    <div v-else-if="checked" class="card">
      <h3 class="text-lg font-semibold text-green-600 mb-2">لا توجد تعارضات</h3>
      <p class="text-green-600">يمكنك جدولة الفعالية في هذا الوقت</p>
    </div>

    <div class="card mt-8">
      <h3 class="text-lg font-semibold mb-4">الفعاليات القادمة</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                الفعالية
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                التاريخ
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                الوقت
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                المكان
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr v-for="event in upcomingEvents" :key="event.id">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
              >
                {{ event.title }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
              >
                {{ event.date }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
              >
                {{ event.time }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
              >
                {{ event.location }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "../components/ui/Button.vue";

const checkDate = ref("");
const checkTime = ref("");
const conflicts = ref([]);
const checked = ref(false);
const upcomingEvents = ref([]);

onMounted(() => {
  fetchUpcomingEvents();
});

const fetchUpcomingEvents = async () => {
  // سيتم تنفيذ هذا من الباكند لاحقاً
  upcomingEvents.value = [
    {
      id: 1,
      title: "مؤتمر التقنية",
      date: "2023-12-15",
      time: "10:00",
      location: "القاعة الرئيسية",
    },
    {
      id: 2,
      title: "ورشة البرمجة",
      date: "2023-12-16",
      time: "14:00",
      location: "معمل الحاسوب",
    },
  ];
};

const checkConflicts = () => {
  // سيتم تنفيذ هذا من الباكند لاحقاً
  if (checkDate.value && checkTime.value) {
    conflicts.value = [
      {
        id: 1,
        title: "فعالية موجودة",
        date: checkDate.value,
        time: checkTime.value,
        location: "نفس المكان",
      },
    ];
    checked.value = true;
  } else {
    alert("يرجى اختيار التاريخ والوقت");
  }
};
</script>
