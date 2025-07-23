import axios from "axios";

const BASE_URL = "https://heafmgbqqsynbdncqsfb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYWZtZ2JxcXN5bmJkbmNxc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NDQyNzEsImV4cCI6MjA2NTUyMDI3MX0.b8ALiTeEYd8qJ5eyOYk7CIfz2SKdtH6BRLrGpkBkAnM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`, // ← INI WAJIB
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const userAPI = {
  async countAll() {
    const res = await axios.get(`${BASE_URL}/user?select=idUser`, { headers });
    return res.data.length;
  },

  async countByRole(role) {
    const res = await axios.get(
      `${BASE_URL}/user?role=eq.${role}&select=idUser`,
      { headers }
    );
    return res.data.length;
  },

  async getUserById(idUser) {
    const res = await axios.get(
      `${BASE_URL}/user?idUser=eq.${idUser}&select=*`,
      {
        headers,
      }
    );
    return res.data[0]; // karena hasilnya array
  },
};

export const statistikAPI = {
  async countPengaduan() {
    const res = await axios.get(`${BASE_URL}/pengaduan?select=idPengaduan`, {
      headers,
    });
    return res.data.length;
  },
};
