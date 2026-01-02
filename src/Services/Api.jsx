


import axios from "axios";

const Api = axios.create({
    baseURL: "https://crm-backend-9nbm.onrender.com/api",
    withCredentials: true,
});

// REQUEST
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        console.log("➡️ Sending Access Token:", token); // 🔹 log access token
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(p => {
        error ? p.reject(error) : p.resolve(token);
    });
    failedQueue = [];
};

// RESPONSE
Api.interceptors.response.use(
    res => res,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest._retry
        ) {
            console.warn("⚠️ Access Token expired, trying refresh...");
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            // console.log("⏳ Retrying request with new token:", token);
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(Api(originalRequest));
                        },
                        reject
                    });
                });
            }

            isRefreshing = true;

            try {
                const res =
                 await axios.post(
                    "http://localhost:5000/api/refresh",
                    {},
                    { withCredentials: true }
                );
                    // await axios.post(
                    //     // use relative to Api.baseURL so it hits same host/port
                    //     `${Api.defaults.baseURL.replace(/\/$/, "")}/refresh`,
                    //     {},
                    //     { withCredentials: true }
                    // );

                const newToken = res.data.accessToken;
                console.log("🔄 Refresh token response:", res.data); // 🔹 log refresh response
                localStorage.setItem("accessToken", newToken);

                processQueue(null, newToken);
                isRefreshing = false;

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return Api(originalRequest);

            } catch (err) {
                console.error("❌ Refresh token failed:", err);
                processQueue(err, null);
                isRefreshing = false;
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export const callApi = async (url, method = "GET", body = null) => {
    try {
        const res = await Api({ url, method, data: body });
        return res.data;
    } catch (err) {
        console.error("API call failed:", err.response?.data || err.message);
        throw err;
    }
};

export default Api;
