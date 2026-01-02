


import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Page refresh
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");

        if (token && user) {
            setAuth({
                accessToken: token,
                ...JSON.parse(user),
            });
        }
        setLoading(false);
    }, []);

    // ✅ Login save
    const saveAuthData = (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        setAuth(data);
    };

    // 🚪 Logout
    const logout = () => {
        localStorage.clear();
        setAuth(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                role: auth?.role || null,
                isAuthorized: !!auth?.accessToken,
                saveAuthData,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
