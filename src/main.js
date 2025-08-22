import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: {
        dark: false, 
        colors: {
          primary: '#433FC6',    
          secondary: '#B51D1D',     
          dark: '#0B0F1B',    
       
        }
      }
    }
  }
})

createApp(App).use(vuetify).mount('#app')
