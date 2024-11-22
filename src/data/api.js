import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post(
          "api/auth/refresh_token",
          {},
          { withCredentials: true }
        );

        const { accessToken } = data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }

    throw error;
  }
);

export default api;
