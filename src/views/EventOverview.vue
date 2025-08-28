<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">الفعاليات</h2>
      <router-link to="/events/add" class="btn-primary">
        إضافة فعالية جديدة
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-gray-600 dark:text-gray-400 mt-2">جاري تحميل الفعاليات...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="events.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">لا توجد فعاليات حالياً</p>
      <router-link to="/events/add" class="btn-primary mt-4 inline-block">
        إضافة أول فعالية
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard 
        v-for="event in events" 
        :key="event.id" 
        :event="event"
        @viewDetails="viewDetails"
        @edit="editEvent"
        @delete="deleteEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EventCard from '../components/events/EventCard.vue';
import { eventService } from '../services/events';

const events = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchEvents = async () => {
  try {
    loading.value = true;
    const response = await eventService.getAllEvents();
    events.value = response.data;
  } catch (err) {
    error.value = 'فشل في تحميل الفعاليات';
    console.error('Error fetching events:', err);
  } finally {
    loading.value = false;
  }
};

const viewDetails = (id) => {
  router.push('/events/${id}');
};

const editEvent = (id) => {
  router.push('/events/edit/${id}');
};

const deleteEvent = async (id) => {
  if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
    try {
      await eventService.deleteEvent(id);
      events.value = events.value.filter(event => event.id !== id);
    } catch (err) {
      error.value = 'فشل في حذف الفعالية';
      console.error('Error deleting event:', err);
    }
  }
};

onMounted(() => {
  fetchEvents();
});
</script>