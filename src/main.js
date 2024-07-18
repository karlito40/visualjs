import "./renderer-layer/assets/main.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { createApp } from "vue";
import App from "./renderer-layer/App.vue";

gsap.registerPlugin(Draggable);

createApp(App).mount("#app");
