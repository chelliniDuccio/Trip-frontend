import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44355/api/", // Qui imposti la base URL
  timeout: 10000, // Imposta un timeout per le richieste (5 secondi in questo caso)
});

export default instance;
