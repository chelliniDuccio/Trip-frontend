<!-- components/TravelCard.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  travel: Object,
});

// Calcola lo sfondo della card con la bandiera
const backgroundStyle = computed(() => ({
  backgroundImage: props.travel?.Country?.Iso
    ? `url(https://flagcdn.com/w320/${props.travel.Country.Iso.toLowerCase()}.png)`
    : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(2px)", // Effetto blur sulla bandiera
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
}));
</script>

<template>
  <div class="card-container">
    <div class="card bg-base-100 shadow-xl relative">
      <!-- Sfondo della bandiera -->
      <div class="card-background" :style="backgroundStyle"></div>

      <!-- Contenuto della card -->
      <div class="card-body text-white bg-black bg-opacity-30 p-6 rounded-lg relative">
        <h2 class="card-title text-xl font-bold">{{ travel.Name }}</h2>
        <p class="text-sm">🌍 Paese: {{ travel.Country?.Name }}</p>
        <p class="text-sm">
          📅 Data Inizio: {{ new Date(travel.StartDate).toLocaleDateString() }}
        </p>
        <p class="text-sm">
          📅 Data Fine: {{ new Date(travel.EndDate).toLocaleDateString() }}
        </p>
        <br />
        <!-- Bottone "Info" in basso a destra -->
        <button class="btn btn-active btn-ghost absolute bottom-2 right-2">Info</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenitore principale */
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 1rem;
}

/* Stile della card */
.card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
}

/* Effetto hover */
.card:hover {
  transform: scale(1.03);
}

/* Sfondo della bandiera */
.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Contenuto della card */
.card-body {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.8rem;
  border-radius: 12px;
}

/* Titolo della card */
.card-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
}

/* Testo */
.text-sm {
  font-size: 0.9rem;
}

/* Pulsante */
.btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  transition: background 0.2s;
  text-align: center;
  margin-top: 0.5rem;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem 2rem;
  }

  .grid {
    flex-direction: column;
    align-items: center;
    padding: 0 1.5rem;
  }
}
</style>
