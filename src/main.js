import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css"; // ملف Tailwind CSS

// Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Toast, { position: "top-right", timeout: 2500 });
app.mount("#app");