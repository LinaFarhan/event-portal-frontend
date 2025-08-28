import api from './api';

export const eventService = {
  // ======== الفعاليات ========
  getAllEvents() {
    return api.get('/api/events');
  },

  getEvent(id) {
    return api.get('/api/events/${id}');
  },

  createEvent(eventData) {
    return api.post('/api/events', eventData);
  },

  updateEvent(id, eventData) {
    return api.put('/api/events/${id}', eventData);
  },

  deleteEvent(id) {
    return api.delete('/api/events/${id}');
  },

  // ======== المتحدثين ========
  getSpeakers() {
    return api.get('/api/speakers');
  },

  addSpeaker(speakerData) {
    return api.post('/api/speakers', speakerData);
  },

  updateSpeaker(id, speakerData) {
    return api.put('/api/speakers/${id}', speakerData);
  },

  deleteSpeaker(id) {
    return api.delete('/api/speakers/${id}');
  },

  // ======== الحضور ========
  getAllAttendees() {
    return api.get('/api/attendees');
  },

  getAttendee(id) {
    return api.get('/api/attendees/${id}');
  },

  createAttendee(attendeeData) {
    return api.post('/api/attendees', attendeeData);
  },

  updateAttendee(id, attendeeData) {
    return api.put('/api/attendees/${id}', attendeeData);
  },

  deleteAttendee(id) {
    return api.delete('/api/attendees/${id}');
  },

  getEventAttendees(eventId) {
    return api.get('/api/events/${eventId}'/attendees);
  }
};