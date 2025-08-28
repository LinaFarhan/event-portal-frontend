 import { createRouter, createWebHistory } from 'vue-router';
import EventsOverview from '../views/EventOverview.vue';
import AddEvent from '../views/AddEvent.vue';
import EditEvent from '../views/EditEvent.vue';
import EventDetails from '../views/EventDetails.vue';
import Speakers from '../views/Speakers.vue';
import Audience from '../views/Audience.vue';
import ExportData from '../views/ExportData.vue';
import ScheduleChecker from '../views/ScheduleChecker.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/events', 
    name: 'events', 
    component: EventsOverview,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/events/add', 
    name: 'add-event', 
    component: AddEvent,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/events/edit/:id', 
    name: 'edit-event', 
    component: EditEvent, 
    props: true,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/events/:id', 
    name: 'event-details', 
    component: EventDetails, 
    props: true,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/speakers', 
    name: 'speakers', 
    component: Speakers,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/audience', 
    name: 'audience', 
    component: Audience,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/export', 
    name: 'export', 
    component: ExportData,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/schedule', 
    name: 'schedule', 
    component: ScheduleChecker,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/settings', 
    name: 'settings', 
    component: Settings,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// حماية Routes التي تتطلب مصادقة
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  // إذا كان المسار يتطلب مصادقة ولم يكن المستخدم مسجلاً
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } 
  // إذا كان المستخدم مسجلاً ويحاول الوصول إلى صفحة التسجيل
  else if (to.name === 'Login' && isAuthenticated) {
    next('/events'); // أو المسار الافتراضي بعد التسجيل
  }
  // في جميع الحالات الأخرى، المتابعة
  else {
    next();
  }
});

export default router;