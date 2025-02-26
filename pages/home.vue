<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">MyApp</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink to="/home" class="btn btn-ghost">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/card" class="btn btn-ghost">Card</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
@import "~/assets/tailwind.css";
</style>
