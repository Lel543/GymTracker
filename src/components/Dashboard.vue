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
          @mouseenter="animateIn($event)"
          @mouseleave="resetChars($event)"
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

      <template #append>
        <v-btn class="ms-1 opacity-60" icon="mdi-bell-outline" />

        <v-btn class="ms-1" icon>
          <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Update profile" />
              <v-list-item link title="Sign out" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Drawer für Mobile -->
    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      location="top"
      temporary
      width="355"
    >
      <!-- dein Drawer Code unverändert -->
    </v-navigation-drawer>

    <v-main>
      <v-toolbar color="surface" elevation="1" height="84">
        <template #title>
          <h2 class="text-h4 font-weight-bold">Dashboard - GymTracker</h2>
        </template>
      </v-toolbar>

      <div class="pa-4">
        <v-sheet
          border="dashed md"
          color="surface-light"
          height="500"
          rounded="lg"
          width="100%"
        />
      </div>
    </v-main>
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


function animateIn(event) {
  const chars = event.currentTarget.querySelectorAll(".char")

  gsap.fromTo(
    chars,
    { opacity: 0, y: 20, rotateX: 90, color: "#999" },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      color: "#000",
      duration: 0.4,
      ease: "back.out(2)",
      stagger: {
        each: 0.03,
        from: "start",
      },
    }
  )
}


function resetChars(event) {
  const chars = event.currentTarget.querySelectorAll(".char")
  gsap.to(chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    color: "#000",
    duration: 0.2,
  })
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
