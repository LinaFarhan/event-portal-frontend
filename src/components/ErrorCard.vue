<template>
  <div class="error-card bg-red-100 text-red-800 p-4 rounded shadow mb-4">
    <h2 class="font-bold">حدث خطأ!</h2>
    <p>رمز الخطأ: {{ code }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "ErrorCard",
  props: {
    code: {
      type: Number,
      default: 500,
    },
    message: {
      type: String,
      default: "خطأ غير معروف",
    },
  },
};
</script>

<style scoped>
.error-card {
  border-left: 4px solid red;
}
</style>