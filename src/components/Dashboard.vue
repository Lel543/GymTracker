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

      <!-- Navbar Items -->
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="me-2 nav-btn Roboto"
          slim
          @mouseenter="glitchIn($event, item.text)"
          @mouseleave="resetChars($event, item.text)"
        >
          <span
            v-for="(char, j) in splitText(item.text)"
            :key="j"
            class="char"
          >
            {{ char }}
          </span>
        </v-btn>
      </template>

      <v-spacer />
    </v-app-bar>
  </v-layout>
</template>

<script setup>
import { shallowRef } from "vue"
import { gsap } from "gsap"

const drawer = shallowRef(false)

const items = [
  { text: "Dashboard" },
  { text: "Users" },
  { text: "Projects" },
  { text: "Settings" },
  { text: "Contact" },
]

function splitText(text) {
  return text.split("")
}

const glitchChars = "!@#$%^&*()_+=-<>?/\\|[]{}"


function glitchIn(event, originalText) {
  const chars = event.currentTarget.querySelectorAll(".char")

  chars.forEach((char, i) => {
  
    const randX = (Math.random() - 0.5) * 100
    const randY = (Math.random() - 0.5) * 100
    const randRot = (Math.random() - 0.5) * 180

    gsap.fromTo(
      char,
      { 
        opacity: 0,
        x: randX,
        y: randY,
        rotate: randRot,
        color: "#ff0055"
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        color: "#000",
        duration: 0.6,
        delay: i * 0.05,
        ease: "power4.out",
        onStart: () => glitchChar(char, originalText[i]),
      }
    )
  })
}

function resetChars(event, originalText) {
  const chars = event.currentTarget.querySelectorAll(".char")
  chars.forEach((char, i) => {
    char.textContent = originalText[i]
    gsap.to(char, {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      color: "#000",
      duration: 0.3,
    })
  })
}

function glitchChar(el, finalChar) {
  let count = 0
  const interval = setInterval(() => {
    el.textContent =
      glitchChars[Math.floor(Math.random() * glitchChars.length)]
    count++
    if (count > 3) {
      clearInterval(interval)
      el.textContent = finalChar
    }
  }, 50)
}
</script>

<style scoped>
.nav-btn {
  font-size: 1.2rem;
  text-transform: none;
  position: relative;
  overflow: hidden;
}

.char {
  display: inline-block;
  will-change: transform, opacity, color;
}
</style>
