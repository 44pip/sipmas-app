import axios from "axios";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`, // ← INI WAJIB
  "Content-Type": "application/json",
  Prefer: "return=representation",
};


export const pengaduanAPI = {
  async fetchAll() {
    const res = await axios.get(`${BASE_URL}/pengaduan?select=*`, { headers });
    return res.data;
  },

  async create(data) {
    try {
      const res = await axios.post(`${BASE_URL}/pengaduan`, data, { headers });
      return res.data;
    } catch (error) {
      console.error(
        "❌ ERROR SUPABASE POST:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
