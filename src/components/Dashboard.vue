<template>
  <v-layout>
    <v-app-bar class="px-md-4" color="white" flat>
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="$vuetify.display.smAndDown"
          @click="drawer = !drawer"
        />
      </template>

      <v-icon class="me-sm-8" max-width="60">mdi-dumbbell</v-icon>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="me-2 nav-btn Roboto"
          slim
          @mouseenter="splitTextIn($event)"
         
        >
          <span class="split-text">{{ item.text }}</span>
        </v-btn>
      </template>

      <v-spacer />
    </v-app-bar>
  </v-layout>
</template>

<script setup>
import { shallowRef } from "vue"
import { gsap } from "gsap"

import SplitText from "gsap/SplitText"
gsap.registerPlugin(SplitText)

const drawer = shallowRef(false)

const items = [
  { text: "Dashboard" },
  { text: "Pläne" },
  { text: "Training" },
  { text: "Readme" },
]


function splitTextIn(event) {
  const el = event.currentTarget.querySelector(".split-text")

  const split = SplitText.create(el, { type: "chars" })
  gsap.fromTo(
    split.chars,
    { y: 30, opacity: 0, rotate: -30 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "back.out(2)",
    }
  )
}

</script>

<style scoped>
.nav-btn {
  font-size: 1.2rem;
  text-transform: none;
  position: relative;
  overflow: hidden;
  width: 240px;
}

.split-text {
  display: inline-block;
  will-change: transform, opacity, color;
}
</style>