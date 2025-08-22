import { createRouter, createWebHistory } from "vue-router";

// صفحات
import Login from "@/views/Login.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import EventsOverview from "@/views/admin/EventsOverview.vue";
import AddEvent from "@/views/admin/AddEvent.vue";
import EditEvent from "@/views/admin/EditEvent.vue";
import EventDetails from "@/views/admin/EventDetails.vue";
import Speakers from "@/views/admin/Speakers.vue";
import Audience from "@/views/admin/Audience.vue";
import ExportData from "@/views/admin/ExportData.vue";
import ScheduleChecker from "@/views/admin/ScheduleChecker.vue";
import Settings from "@/views/admin/Settings.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/events", component: EventsOverview, meta: { requiresAuth: true } },
  { path: "/events/add", component: AddEvent, meta: { requiresAuth: true } },
  { path: "/events/edit/:id", component: EditEvent, meta: { requiresAuth: true }, props: true },
  { path: "/events/:id", component: EventDetails, meta: { requiresAuth: true }, props: true },
  { path: "/speakers", component: Speakers, meta: { requiresAuth: true } },
  { path: "/audience", component: Audience, meta: { requiresAuth: true } },
  { path: "/export", component: ExportData, meta: { requiresAuth: true } },
  { path: "/schedule", component: ScheduleChecker, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// حماية الصفحات
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else if (to.path === "/login" && user) {
    next("/dashboard"); // إذا مسجل دخول، لا يرجع Login
  } else {
    next();
  }
});

export default router;