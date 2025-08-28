<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">إدارة المتحدثين</h2>
    
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">قائمة المتحدثين</h3>
        <Button @click="showAddModal = true">إضافة متحدث</Button>
      </div>

      <Loader v-if="loading" />
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الاسم</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">التخصص</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">البريد الإلكتروني</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الهاتف</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="speaker in speakers" :key="speaker.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ speaker.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ speaker.expertise }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ speaker.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ speaker.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editSpeaker(speaker)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">تعديل</button>
                <button @click="deleteSpeaker(speaker.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">حذف</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for adding/editing speakers -->
    <Modal :show="showAddModal" :title="isEditing ? 'تعديل متحدث' : 'إضافة متحدث'" @update:show="closeModal">
      <form @submit.prevent="saveSpeaker" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الاسم</label>
          <input v-model="speakerForm.name" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">التخصص</label>
          <input v-model="speakerForm.expertise" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
          <input v-model="speakerForm.email" type="email" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الهاتف</label>
          <input v-model="speakerForm.phone" type="tel" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">السيرة الذاتية</label>
          <textarea v-model="speakerForm.bio" rows="3" class="w-full px-3 py-2 border rounded-md"></textarea>
        </div>
        <div class="flex justify-end space-x-2 space-x-reverse">
          <Button type="button" variant="secondary" @click="closeModal">إلغاء</Button>
          <Button type="submit">{{ isEditing ? 'تحديث' : 'إضافة' }}</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from '../components/ui/Button.vue';
import Loader from '../components/ui/Loader.vue';
import Modal from '../components/ui/Modal.vue';

const loading = ref(false);
const showAddModal = ref(false);
const isEditing = ref(false);
const speakers = ref([]);

const speakerForm = ref({
  id: null,
  name: '',
  expertise: '',
  email: '',
  phone: '',
  bio: ''
});

onMounted(() => {
  fetchSpeakers();
});

const fetchSpeakers = async () => {
  // سيتم تنفيذ هذا من الباكند لاحقاً
  loading.value = true;
  setTimeout(() => {
    speakers.value = [
      { id: 1, name: 'د. أحمد السعدي', expertise: 'تقنية المعلومات', email: 'ahmed@example.com', phone: '0512345678', bio: 'خبير في تقنية المعلومات' },
      { id: 2, name: 'أ. فاطمة العبدالله', expertise: 'التسويق الرقمي', email: 'fatima@example.com', phone: '0554321098', bio: 'متخصصة في التسويق الرقمي' }
    ];
    loading.value = false;
  }, 1000);
};

const saveSpeaker = () => {
  if (isEditing.value) {
    // تحديث المتحدث
    const index = speakers.value.findIndex(s => s.id === speakerForm.value.id);
    if (index !== -1) {
      speakers.value[index] = { ...speakerForm.value };
    }
  } else {
    // إضافة متحدث جديد
    const newSpeaker = {
      ...speakerForm.value,
      id: speakers.value.length + 1
    };
    speakers.value.push(newSpeaker);
  }
  closeModal();
};

const editSpeaker = (speaker) => {
  speakerForm.value = { ...speaker };
  isEditing.value = true;
  showAddModal.value = true;
};

const deleteSpeaker = (id) => {
  if (confirm('هل أنت متأكد من حذف هذا المتحدث؟')) {
    speakers.value = speakers.value.filter(s => s.id !== id);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  isEditing.value = false;
  speakerForm.value = {
    id: null,
    name: '',
    expertise: '',
    email: '',
    phone: '',
    bio: ''
  };
};
</script>