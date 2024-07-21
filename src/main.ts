import "./renderer-layer/assets/main.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { createApp } from "vue";
import App from "./renderer-layer/App.vue";
import { init as initVisualJS } from "@/visualjs/visualjs";

(async () => {
  gsap.registerPlugin(Draggable);

  // TODO: could be initialized later, or without await
  // (just to prevent blank screen for a while)
  await initVisualJS();

  createApp(App).mount("#app");
})();
