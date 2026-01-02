


import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Api from "../../Services/Api"; // 

export default function Login() {
    const navigate = useNavigate();
    const { saveAuthData } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 🔥 CENTRALIZED API CALL
            const res = await Api.post("/login", form);
            const response = res.data;

            console.log("Login Response:", response);

            if (response.status !== "success") {
                toast.error("Invalid response from server");
                return;
            }

            // 🔥 SINGLE SOURCE OF TRUTH
            const authData = {
                accessToken: response.data.accessToken,
                role: response.data.user,
                userId: response.data.userId,
                isVerified: response.data.isVerified,
            };


            // 🔥 Save to Context + localStorage
            saveAuthData(authData);

            toast.success("Login successful");

            // 🔁 Navigation
            if (!authData.isVerified) {
                navigate("/verify-otp");
            } else {
                navigate("/dashboard");
            }

            setForm({ email: "", password: "" });

        } catch (err) {
            console.error(err);
            toast.error(
                err?.response?.data?.message || "Invalid Credentials"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Login
                </h2>

                <p className="text-center text-gray-500">
                    Enter your credentials to access the CRM
                </p>

                <div className="flex flex-col">
                    <label className="font-medium mb-2 text-gray-700">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium mb-2 text-gray-700">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
