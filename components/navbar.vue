<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/"); // Redirect alla home
};
</script>

<template>
  <div class="navbar bg-gray-900 text-white p-4 shadow-lg">
    <div class="navbar-start">
      <img src="@/assets/TripLogo.png" alt="Trip Logo" class="logo" @click="goHome" />
    </div>
    <div class="navbar-end"></div>
    <div class="dropdown dropdown-end relative">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar placeholder">
        <div class="bg-neutral text-neutral-content w-12 rounded-full">
          <span>DC</span>
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg absolute right-0"
      >
        <li><a class="hover:bg-gray-700 p-2 rounded block">Profile</a></li>
        <li><a class="hover:bg-gray-700 p-2 rounded block">Settings</a></li>
        <li><a class="hover:bg-gray-700 p-2 rounded block">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #1f2937;
  color: white;
  transition: background-color 0.3s ease-in-out;
}

.navbar a {
  color: white;
  text-decoration: none;
  display: block;
}

.navbar a:hover {
  color: #d1d5db;
}

.dropdown-content {
  background-color: #374151;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  min-width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  height: 60px; /* Regola l'altezza come preferisci */
  width: auto; /* Mantiene le proporzioni */
}
</style>
