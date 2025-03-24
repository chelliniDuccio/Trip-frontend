export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/tailwind.css"],
  pages: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2025-02-23",
  components: true,
  app: {
    head: {
      script: [
        {
          type: 'module',
          src: 'https://unpkg.com/cally',
        },
      ],
    },
  },
});
