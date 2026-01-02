
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get auth from localStorage
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userId = auth?.userId;
        const role = auth?.role;

        if (!userId) {
            toast.error("User ID not found. Please login again.");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/otp-verify", {
                userId,
                otp
            });

            // accessToken is returned only
            const accessToken = res.data.data;
            console.log(accessToken)

            toast.success("OTP Verified Successfully");

            // Update storage (mark verified)
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    ...auth,
                    token: accessToken,
                    isVerified: true
                })
            );

            // Navigate with saved role
            if (role === "Admin") navigate("/dashboard/admin");
            if (role === "Counsellor") navigate("/dashboard/counsellor");
            if (role === "Hr") navigate("/dashboard/hr");

        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
            <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
                Verify
            </button>
        </form>
    );
}
