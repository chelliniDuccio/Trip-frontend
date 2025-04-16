<script setup>
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();

// Retrieve the user cookie
const userCookie = useCookie("user").value;
let avatar = ""; // Default avatar initials

if (userCookie) {
  try {
    avatar = userCookie.avatar || "DC"; // Use the avatar from the cookie or fallback to "DC"
  } catch (e) {
    console.error("Error parsing user cookie:", e);
  }
}

const goHome = () => {
  router.push("/"); // Redirect to home
};
</script>

<template>
  <div class="navbar bg-gray-400 text-white p-4 shadow-lg">
    <div class="navbar-start">
      <img src="@/assets/TripLogo.png" alt="Trip Logo" class="logo" @click="goHome" />
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end relative">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar placeholder">
          <div v-if="avatar.startsWith('http')" class="w-12 rounded-full overflow-hidden">
            <img :src="avatar" alt="User Avatar" />
          </div>
          <div v-else class="bg-neutral text-neutral-content w-12 rounded-full flex items-center justify-center">
            <span>{{ avatar }}</span>
          </div>
        </div>
        <ul tabindex="0"
          class="menu menu-sm dropdown-content bg-gray-400 text-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg absolute right-0">
          <li><a class="hover:bg-gray-700 p-2 rounded block">Profile</a></li>
          <li><a class="hover:bg-gray-700 p-2 rounded block">Settings</a></li>
          <li><a class="hover:bg-gray-700 p-2 rounded block">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #005de8;
  color: white;
  transition: background-color 0.3s ease-in-out;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
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
  height: 70px;
  width: auto;
}
</style>