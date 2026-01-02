


import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {
    const { auth, logout } = useAuth(); // ✅ CONTEXT
    const navigate = useNavigate();

    const role = auth?.role; // ✅ NOW IT WORKS
    // console.log("ROLE:", role);

    const getWelcomeText = () => {
        if (role === "Admin") return "Welcome Admin";
        if (role === "Hr") return "Welcome HR";
        if (role === "Counsellor") return "Welcome Counsellor";
        return "Welcome";
    };

    const handleLogout = () => {
        logout();       // clears context + localStorage
        navigate("/login");
    };

    return (
        <header className="h-16 bg-blue-200 shadow flex items-center justify-between px-6">
            <h1 className="font-semibold text-lg">
                {getWelcomeText()}
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </header>
    );
}
