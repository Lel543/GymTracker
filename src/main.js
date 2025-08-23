import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "../src/assets/styles/fonts.css";
import "@mdi/font/css/materialdesignicons.css";
import "../src/styles/core.css";
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myTheme",
    themes: {
      myTheme: {
        dark: false,
        colors: {
          primary: "#222831",
          secondary: "#76ABAE",
          accent: "#EEEEEE",
          success: "#4CAF50",
          error: "#FF5252",
          info: "#393E46",
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount("#app");
