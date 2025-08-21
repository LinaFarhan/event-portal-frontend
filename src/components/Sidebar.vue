 <template>
  <aside class="sidebar bg-gray-100 dark:bg-gray-900 w-64 h-screen p-4">
    <nav>
      <ul>
        <li class="mb-2"><router-link to="/dashboard">لوحة التحكم</router-link></li>
        <li class="mb-2"><router-link to="/events">الفعاليات</router-link></li>
        <li class="mb-2"><router-link to="/speakers">المتحدثون</router-link></li>
        <li class="mb-2"><router-link to="/audience">الحضور</router-link></li>
        <li class="mb-2"><router-link to="/settings">الإعدادات</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar a {
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  color: #333;
}
.sidebar a.router-link-exact-active {
  background-color: #3b82f6;
  color: white;
}
</style>