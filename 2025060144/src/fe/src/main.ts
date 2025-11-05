import "./style/main.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import ui from "@nuxt/ui/vue-plugin";

import App from "./App.vue";
import Index from "./components/Index.vue";
import FormPage from "./components/form/Form.vue";
import Error from "./components/Error.vue";
import Reset from "./components/Reset.vue";

const app = createApp(App);
const router = createRouter({
  routes: [
    { path: "/", component: Index },
    { path: "/form/:form_id", component: FormPage },
    { path: "/reset", component: Reset },
    { path: "/error/:code?", component: Error },
    { path: "/:pathMatch(.*)*", redirect: "/error/404" }, // 捕获未匹配路径
  ],
  history: createWebHistory(),
});

app.use(router);
app.use(ui);
app.mount("#app");
