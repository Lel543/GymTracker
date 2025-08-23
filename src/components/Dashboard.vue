<template>
  <v-layout>
    <v-app-bar class="px-md-4" color="primary" flat>
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="$vuetify.display.smAndDown"
          @click="drawer = !drawer"
        />
      </template>

      <v-icon class="me-sm-8" max-width="60" color="secondary"
        >mdi-dumbbell</v-icon
      >

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :active="i === 0"
          class="me-2 Roboto"
          slim
          color="secondary"
          variant="tonal"
          v-bind="item"
        />
      </template>

      <v-spacer />

      <template #append>
        <v-btn
          class="ms-1 opacity-60"
          icon="mdi-bell-outline"
          color="secondary"
        />
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
      color="primary"
    >
      <v-list class="py-0" slim>
        <v-list-item
          link
          prepend-icon="mdi-home-outline"
          title="Dashboard"
          color="secondary"
        />
        <v-list-group
          prepend-icon="mdi-account-multiple-outline"
          title="Customers"
        >
          <template #activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" />
          </template>
          <v-list-item
            link
            prepend-icon="mdi-account-plus-outline"
            title="Create New"
          />
          <v-list-group prepend-icon="mdi-magnify" title="Search">
            <template #activator="{ props: activatorProps }">
              <v-list-item v-bind="activatorProps" />
            </template>
            <v-list-item
              link
              prepend-icon="mdi-account-outline"
              title="By Name"
            />
            <v-list-item
              link
              prepend-icon="mdi-email-outline"
              title="By Email"
            />
            <v-list-item
              link
              prepend-icon="mdi-phone-outline"
              title="By Phone"
            />
          </v-list-group>
        </v-list-group>
        <v-list-item link prepend-icon="mdi-calendar" title="Calendar" />
        <v-list-item link prepend-icon="mdi-poll" title="Analytics" />
        <v-divider />
        <v-list-item link prepend-icon="mdi-inbox-outline" title="Inbox" />
        <v-list-item
          link
          prepend-icon="mdi-bell-outline"
          title="Notifications"
        />
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
      <v-toolbar color="accent" elevation="1" height="84">
        <template #title>
          <h2 class="text-h4 font-weight-bold" style="color: #222831">
            Dashboard - GymTracker
          </h2>
        </template>
      </v-toolbar>

      <v-sheet height="500" width="100%" rounded="lg" color="accent">
        <div class="d-flex justify-center align-center m-2">
          <v-btn-group divided>
            <v-btn
              icon="mdi-chevron-left"
              color="secondary"
              variant="tonal"
              size="large"
              :disabled="currentWeek === 0"
              @click="prevWeek"
              aria-label="Vorherige Woche"
            />
            <v-btn
              variant="text"
              class="font-weight-bold text-h5"
              style="pointer-events: none; min-width: 120px; color: #222831"
            >
              Woche {{ currentWeek + 1 }}
            </v-btn>
            <v-btn
              icon="mdi-chevron-right"
              color="secondary"
              variant="tonal"
              size="large"
              :disabled="currentWeek === weeks.length - 1"
              @click="nextWeek"
              aria-label="Nächste Woche"
            />
          </v-btn-group>
        </div>
        <div class="chart-container">
          <canvas id="myBarChart"></canvas>
        </div>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { shallowRef } from "vue";
import Chart from "chart.js/auto";

const weeks = [
  {
    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    data: [2, 1, 0, 0, 2, 1, 0],
  },
  {
    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    data: [1, 2, 2, 1, 0, 2, 3],
  },
  {
    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    data: [0, 1, 1, 2, 2, 1, 1],
  },
];
const currentWeek = ref(0);
let chartInstance = null;

function renderChart() {
  const ctx = document.getElementById("myBarChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  const weekData = weeks[currentWeek.value].data;
  const avg = weekData.reduce((a, b) => a + b, 0) / weekData.length;
  const avgArray = Array(weekData.length).fill(avg);

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: weeks[currentWeek.value].labels,
      datasets: [
        {
          label: "Trainings",
          data: weekData,
          backgroundColor: "#76ABAE", // secondary
          borderRadius: 8,
        },
        {
          label: "Durchschnitt",
          data: avgArray,
          type: "line",
          borderColor: "#222831", // primary
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          order: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: "Trainings pro Woche (mit Durchschnitt)",
          color: "#222831",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#EEEEEE" }, // accent
          ticks: { color: "#222831" }, // primary
        },
        x: {
          grid: { color: "#EEEEEE" }, // accent
          ticks: { color: "#222831" }, // primary
        },
      },
    },
  });
}

function prevWeek() {
  if (currentWeek.value > 0) currentWeek.value--;
}
function nextWeek() {
  if (currentWeek.value < weeks.length - 1) currentWeek.value++;
}

onMounted(renderChart);
watch(currentWeek, renderChart);

const drawer = shallowRef(false);

const items = [
  { text: "Dashboard" },
  { text: "Users" },
  { text: "Projects" },
  { text: "Settings" },
  { text: "Contact" },
];
</script>

<style>
.DynamicFont {
  font-family: "DynamicFont", sans-serif;
}
.ProRacing {
  font-family: "ProRacing";
}
.Roboto {
  font-family: "Roboto", sans-serif;
}
.chart-container {
  position: relative;
  height: 40vh;
  width: 90vw;
  margin: 0 auto;
}
</style>
