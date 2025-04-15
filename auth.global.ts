import { defineNuxtRouteMiddleware, useCookie, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token').value;

  // Se non c'è token e non siamo già nella pagina login
  if (!token && to.path !== '/auth/login') {
    return navigateTo('/auth/login');
  }
});
