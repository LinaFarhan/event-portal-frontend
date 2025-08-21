<template>
  <div v-if="visible" class="toast fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "ToastNotification",
  props: {
    message: {
      type: String,
      default: "تمت العملية بنجاح!",
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  },
};
</script>

<style scoped>
.toast {
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>