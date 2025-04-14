<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/src/axios';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;

    // Salva il token
    useCookie('token').value = token;

    // Reindirizza alla home
    router.push('/');
  } catch (err) {
    error.value = 'Login fallito. Controlla le credenziali.';
    console.error(err);
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center mb-4">Accedi</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" placeholder="email@example.com" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered" required />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">Login</button>
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>
