import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

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

  // tambahkan di dalam export const pengaduanAPI
async updatePengaduan(id, data) {
  try {
    const res = await axios.patch(
      `${BASE_URL}/pengaduan?idPengaduan=eq.${id}`,
      data,
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error.response?.data || error.message);
    throw error;
  }
},
  
  async deletePengaduan(id) {
    try {
      const res = await axios.delete(
        `${BASE_URL}/pengaduan?idPengaduan=eq.${id}`,
        { headers }
      );

      return res.data;
    } catch (error) {
      console.error("❌ DELETE ERROR:", error.response?.data || error.message);
      throw error;
    }
  },
  async fetchLatest7Hari() {
    const sevenDaysAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

    const res = await axios.get(
      `${BASE_URL}/pengaduan?select=*&created_at=gte.${sevenDaysAgo}&order=created_at.desc`,
      { headers }
    );

    return res.data;
  },
  async fetchByUserId(idUser) {
    const res = await axios.get(
      `${BASE_URL}/pengaduan?idUser=eq.${idUser}&order=created_at.desc`,
      { headers }
    );
    return res.data;
  },
};
