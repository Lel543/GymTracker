import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "../src/assets/styles/fonts.css";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myTheme",
    themes: {
      myTheme: {
        dark: false,
        colors: {
          primary: "#222831", // Anthrazit
          secondary: "#76ABAE", // Türkis
          accent: "#EEEEEE", // Helles Grau
          success: "#4CAF50", // Grün
          error: "#FF5252", // Rot
          info: "#393E46", // Dunkleres Grau
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount("#app");
