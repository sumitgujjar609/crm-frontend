


import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import NavTabItems from "../../Utils/NavTabItems";

export default function Sidebar() {
    const { role } = useAuth();
    // console.log("Role:", role);

    // Filter tabs based on role
    const allowedTabs = NavTabItems.filter(tab =>
        tab.allowedRoles.includes(role)
    );

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
            {/* Logo / Title */}
            <h2 className="text-2xl font-bold mb-8">CRM</h2>

            {/* Navigation */}
            <nav className="space-y-3">
                {allowedTabs.map((tab, index) => (
                    <NavLink
                        key={index}
                        to={tab.path}
                        className={({ isActive }) =>
                            isActive
                                ? "block px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                                : "block px-4 py-2 rounded hover:bg-gray-800 transition"
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
