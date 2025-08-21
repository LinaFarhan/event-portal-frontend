<template>
  <div class="dashboard p-4">
    <h1 class="text-2xl font-bold mb-4">لوحة التحكم</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="card bg-gray-100 p-4 rounded shadow">
        <h2 class="font-semibold">عدد الفعاليات</h2>
        <p>{{ eventsCount }}</p>
      </div>
      <div class="card bg-gray-100 p-4 rounded shadow">
        <h2 class="font-semibold">عدد المتحدثين</h2>
        <p>{{ speakersCount }}</p>
      </div>
      <div class="card bg-gray-100 p-4 rounded shadow">
        <h2 class="font-semibold">عدد الحضور</h2>
        <p>{{ audienceCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      eventsCount: 0,
      speakersCount: 0,
      audienceCount: 0,
    };
  },
  mounted() {
    // استدعاء API لجلب الإحصائيات
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        // مثال: استخدام Axios لاستدعاء API
        const events = await this.$axios.get("/api/v1/events");
        this.eventsCount = events.data.length;

        const speakers = await this.$axios.get("/api/v1/speakers");
        this.speakersCount = speakers.data.length;

        const audience = await this.$axios.get("/api/v1/audience");
        this.audienceCount = audience.data.length;
      } catch (error) {
        console.error("فشل جلب البيانات", error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard .card {
  transition: transform 0.2s;
}
.dashboard .card:hover {
  transform: translateY(-3px);
}
</style>