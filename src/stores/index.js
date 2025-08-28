import { defineStore } from 'pinia';
import { ref } from 'vue';
import { eventService } from '../services/events';

export const useEventStore = defineStore('event', () => {
  const events = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await eventService.getAllEvents();
      events.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch events';
    } finally {
      loading.value = false;
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await eventService.createEvent(eventData);
      events.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add event';
      throw err;
    }
  };

  return { events, loading, error, fetchEvents, addEvent };
});