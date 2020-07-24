import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "tailwindcss/tailwind.css";

import createServer from "../fakedb";
createServer();

createApp(App).mount("#app");
