<template>
  <v-layout>
    <v-app-bar class="px-md-4" color="surface-variant" flat>
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
          :active="i === 0"
          class="me-2 Roboto"
          slim
          v-bind="item"
        />
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

    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      location="top"
      temporary
      width="355"
    >
      <v-list class="py-0" slim>
        <v-list-item link prepend-icon="mdi-home-outline" title="Dashboard" />
        <v-list-group prepend-icon="mdi-account-multiple-outline" title="Customers">
          <template #activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" />
          </template>
          <v-list-item link prepend-icon="mdi-account-plus-outline" title="Create New" />
          <v-list-group prepend-icon="mdi-magnify" title="Search">
            <template #activator="{ props: activatorProps }">
              <v-list-item v-bind="activatorProps" />
            </template>
            <v-list-item link prepend-icon="mdi-account-outline" title="By Name" />
            <v-list-item link prepend-icon="mdi-email-outline" title="By Email" />
            <v-list-item link prepend-icon="mdi-phone-outline" title="By Phone" />
          </v-list-group>
        </v-list-group>
        <v-list-item link prepend-icon="mdi-calendar" title="Calendar" />
        <v-list-item link prepend-icon="mdi-poll" title="Analytics" />
        <v-divider />
        <v-list-item link prepend-icon="mdi-inbox-outline" title="Inbox" />
        <v-list-item link prepend-icon="mdi-bell-outline" title="Notifications" />
        <v-divider />
        <v-list-item
          lines="two"
          link
          prepend-avatar="https://vuetifyjs.b-cdn.net/docs/images/avatars/planetary-subscriber.png"
          subtitle="Vuetify Engineer"
          title="John Leider"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-toolbar color="surface" elevation="1" height="84">
        <template #title>
          <h2 class="text-h4 font-weight-bold">Dashboard - GymTracker</h2>
        </template>
      </v-toolbar>

      <v-sheet height="500" width="100%" rounded="lg">
        <div class="d-flex justify-space-between align-center m-2">
          <v-btn @click="prevWeek" :disabled="currentWeek === 0" color="primary" variant="elevated" elevation="8" size="large" rounded="xl" prepend-icon="mdi-chevron-left">
            Vorherige Woche
          </v-btn>
          <span class="font-weight-bold text-primary text-h5">Woche {{ currentWeek + 1 }}</span>
          <v-btn @click="nextWeek" :disabled="currentWeek === weeks.length - 1" color="primary" variant="elevated" elevation="8" size="large" rounded="xl" append-icon="mdi-chevron-right">
            Nächste Woche
          </v-btn>
        </div>
        <div class="chart-container">
          <canvas id="myBarChart"></canvas>
        </div>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { shallowRef } from 'vue'
import Chart from 'chart.js/auto'

const weeks = [
  {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    data: [2, 1, 0, 3, 2, 1, 0]
  },
  {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    data: [1, 2, 2, 1, 0, 2, 3]
  },
  {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    data: [0, 1, 1, 2, 2, 3, 1]
  }
]
const currentWeek = ref(0)
let chartInstance = null

function renderChart() {
  const ctx = document.getElementById('myBarChart').getContext('2d')
  if (chartInstance) chartInstance.destroy()

  const weekData = weeks[currentWeek.value].data
  const avg = weekData.reduce((a, b) => a + b, 0) / weekData.length
  const avgArray = Array(weekData.length).fill(avg)

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks[currentWeek.value].labels,
      datasets: [
        {
          label: 'Trainings',
          data: weekData,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderRadius: 8,
        },
        {
          label: 'Durchschnitt',
          data: avgArray,
          type: 'line',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          order: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Trainings pro Woche (mit Durchschnitt)' }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

function prevWeek() {
  if (currentWeek.value > 0) currentWeek.value--
}
function nextWeek() {
  if (currentWeek.value < weeks.length - 1) currentWeek.value++
}

onMounted(renderChart)
watch(currentWeek, renderChart)

const drawer = shallowRef(false)

const items = [
  { text: 'Dashboard' },
  { text: 'Users' },
  { text: 'Projects' },
  { text: 'Settings' },
  { text: 'Contact' },
]
</script>

<style>
.DynamicFont {
  font-family: 'DynamicFont', sans-serif;
}
.ProRacing {
  font-family: 'ProRacing';
}
.Roboto {
  font-family: 'Roboto', sans-serif;
}
.chart-container {
  position: relative;
  height: 40vh;
  width: 90vw;
  margin: 0 auto;
}
</style>