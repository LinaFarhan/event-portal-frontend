<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">إدارة الحضور</h2>
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">قائمة الحضور</h3>
        <Button @click="showAddModal = true">إضافة حضور</Button>
      </div>
      <Loader v-if="loading" />
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الاسم</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">البريد الإلكتروني</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الهاتف</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الفعالية</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">تاريخ التسجيل</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="attendee in attendees" :key="attendee.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ attendee.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ attendee.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ attendee.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ attendee.event_title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ formatDate(attendee.registered_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editAttendee(attendee)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">تعديل</button>
                <button @click="deleteAttendee(attendee.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">حذف</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for adding/editing attendees -->
    <Modal :show="showAddModal" :title="isEditing ? 'تعديل حضور' : 'إضافة حضور'" @update:show="closeModal">
      <form @submit.prevent="saveAttendee" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الاسم</label>
          <input v-model="attendeeForm.name" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
          <input v-model="attendeeForm.email" type="email" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الهاتف</label>
          <input v-model="attendeeForm.phone" type="tel" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الفعالية</label>
          <select v-model="attendeeForm.event_id" class="w-full px-3 py-2 border rounded-md" required>
            <option v-for="event in events" :key="event.id" :value="event.id">{{ event.title }}</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <Button type="button" variant="secondary" @click="closeModal">إلغاء</Button>
          <Button type="submit">{{ isEditing ? 'تحديث' : 'إضافة' }}</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { eventService } from '../services/events';
import Button from '../components/ui/Button.vue';
import Loader from '../components/ui/Loader.vue';
import Modal from '../components/ui/Modal.vue';

const loading = ref(false);
const showAddModal = ref(false);
const isEditing = ref(false);
const attendees = ref([]);
const events = ref([]);

const attendeeForm = reactive({
  id: null,
  name: '',
  email: '',
  phone: '',
  event_id: ''
});

onMounted(() => {
  fetchAttendees();
  fetchEvents();
});

const fetchAttendees = async () => {
  loading.value = true;
  try {
    const response = await eventService.getAllAttendees();
    attendees.value = response.data;
  } catch (error) {
    console.error('Error fetching attendees:', error);
    alert('فشل في تحميل بيانات الحضور');
  } finally {
    loading.value = false;
  }
};

const fetchEvents = async () => {
  try {
    const response = await eventService.getAllEvents();
    events.value = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    alert('فشل في تحميل الفعاليات');
  }
};

const saveAttendee = async () => {
  try {
    if (isEditing.value) {
      await eventService.updateAttendee(attendeeForm.id, attendeeForm);
      alert('تم تحديث بيانات الحضور بنجاح');
    } else {
      await eventService.createAttendee(attendeeForm);
      alert('تم إضافة الحضور بنجاح');
    }
    
    showAddModal.value = false;
    resetForm();
    fetchAttendees();
  } catch (error) {
    console.error('Error saving attendee:', error);
    alert('فشل في حفظ بيانات الحضور');
  }
};

const editAttendee = (attendee) => {
  Object.assign(attendeeForm, attendee);
  isEditing.value = true;
  showAddModal.value = true;
};

const deleteAttendee = async (id) => {
  if (confirm('هل أنت متأكد من حذف هذا الحضور؟')) {
    try {
      await eventService.deleteAttendee(id);
      alert('تم حذف الحضور بنجاح');
      fetchAttendees();
    } catch (error) {
      console.error('Error deleting attendee:', error);
      alert('فشل في حذف الحضور');
    }
  }
};

const closeModal = () => {
  showAddModal.value = false;
  resetForm();
};

const resetForm = () => {
  attendeeForm.id = null;
  attendeeForm.name = '';
  attendeeForm.email = '';
  attendeeForm.phone = '';
  attendeeForm.event_id = '';
  isEditing.value = false;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-SA');
};
</script>