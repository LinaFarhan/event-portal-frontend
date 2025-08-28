<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">تصدير البيانات</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card text-center">
        <h3 class="text-lg font-semibold mb-4">تصدير الفعاليات</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">قم بتحميل جميع الفعاليات بصيغة CSV أو Excel</p>
        <div class="space-y-2">
          <Button @click="exportData('events', 'csv')" variant="secondary" class="w-full">CSV</Button>
          <Button @click="exportData('events', 'excel')" variant="secondary" class="w-full">Excel</Button>
        </div>
      </div>

      <div class="card text-center">
        <h3 class="text-lg font-semibold mb-4">تصدير الحضور</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">قم بتحميل بيانات الحضور بصيغة CSV أو Excel</p>
        <div class="space-y-2">
          <Button @click="exportData('attendees', 'csv')" variant="secondary" class="w-full">CSV</Button>
          <Button @click="exportData('attendees', 'excel')" variant="secondary" class="w-full">Excel</Button>
        </div>
      </div>

      <div class="card text-center">
        <h3 class="text-lg font-semibold mb-4">تصدير المتحدثين</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">قم بتحميل بيانات المتحدثين بصيغة CSV أو Excel</p>
        <div class="space-y-2">
          <Button @click="exportData('speakers', 'csv')" variant="secondary" class="w-full">CSV</Button>
          <Button @click="exportData('speakers', 'excel')" variant="secondary" class="w-full">Excel</Button>
        </div>
      </div>
    </div>

    <div class="card mt-8">
      <h3 class="text-lg font-semibold mb-4">التقارير المتقدمة</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الفترة الزمنية</label>
          <div class="flex space-x-2 space-x-reverse">
            <input type="date" v-model="reportParams.startDate" class="flex-1 px-3 py-2 border rounded-md" />
            <input type="date" v-model="reportParams.endDate" class="flex-1 px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع التقرير</label>
          <select v-model="reportParams.type" class="w-full px-3 py-2 border rounded-md">
            <option value="summary">ملخص</option>
            <option value="detailed">مفصل</option>
          </select>
        </div>
      </div>
      <Button @click="generateReport" class="mt-4">إنشاء التقرير</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '../components/ui/Button.vue';

const reportParams = ref({
  startDate: '',
  endDate: '',
  type: 'summary'
});

const exportData = (type, format) => {
  //  الباك اند
  alert('جاري تصدير ${type} بصيغة ${format}');
};

const generateReport = () => {
  //  الباك اند
  alert('جاري إنشاء التقرير');
};
</script>