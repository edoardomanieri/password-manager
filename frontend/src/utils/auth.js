import Axios from "axios";

export async function refreshToken() {
  try {
    const refresh = localStorage.getItem("refresh");
    const response = await Axios.post("/login/token-refresh/", {
      refresh: refresh,
    });
    localStorage.setItem("token", response.data.access);
    return response.data.access;
  } catch (error) {
    // Handle refresh failure
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
    return null;
  }
}

// Add this to handle 401 responses
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `JWT ${newToken}`;
        return Axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
