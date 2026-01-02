


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Services/Api";
import { useAuth } from "../../Context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
    Users,
    BookOpen,
    Briefcase,
    FileText,
    ChevronRight
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

export default function Dashboard() {
    const { role } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await Api.get("/dashboard/get-all-data");
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (type) => {
        switch (type) {
            case "students":
                navigate("/students");
                break;
            case "courses":
                navigate("/courses");
                break;
            case "placements":
                navigate("/placements");
                break;
            case "resumes":
                navigate("/resumes");
                break;
            default:
                break;
        }
    };

    if (loading) return <p className="p-6">Loading Dashboard...</p>;

    /* 📊 UPDATED CHART DATA */
    const barData = [
        { name: "Students", value: data.totalStudents },
        { name: "Courses", value: data.totalCourses },
        { name: "Placements", value: data.totalPlacements },
        { name: "Resumes", value: data.totalResumes }
    ];

    const pieData = [
        { name: "Placements", value: data.totalPlacements },
        { name: "Resumes", value: data.totalResumes }
    ];

    const COLORS = ["#2563eb", "#16a34a"];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <div className="p-6 space-y-8 flex-1 overflow-auto">
                    <div>
                        <h1 className="text-3xl font-bold">{role} Dashboard</h1>
                        <p className="text-gray-500">CRM Overview & Analytics</p>
                    </div>

                    {/* 🔷 CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {role === "Admin" && (
                            <>
                                <ClickableCard
                                    title="Total Students"
                                    value={data.totalStudents}
                                    icon={<Users />}
                                    color="from-blue-500 to-blue-700"
                                    onClick={() => handleCardClick("students")}
                                />
                                <ClickableCard
                                    title="Total Courses"
                                    value={data.totalCourses}
                                    icon={<BookOpen />}
                                    color="from-pink-500 to-pink-700"
                                    onClick={() => handleCardClick("courses")}
                                />
                                <ClickableCard
                                    title="Total Placements"
                                    value={data.totalPlacements}
                                    icon={<Briefcase />}
                                    color="from-green-500 to-green-700"
                                    onClick={() => handleCardClick("placements")}
                                />
                                <ClickableCard
                                    title=" Total Resumes"
                                    value={data.totalResumes}
                                    icon={<FileText />}
                                    color="from-purple-500 to-purple-700"
                                    onClick={() => handleCardClick("resumes")}
                                />
                            </>
                        )}

                        {role === "Counsellor" && (
                            <>
                                <ClickableCard
                                    title="Students"
                                    value={data.totalStudents}
                                    icon={<Users />}
                                    color="from-blue-500 to-blue-700"
                                    onClick={() => handleCardClick("students")}
                                />
                                <ClickableCard
                                    title="Courses"
                                    value={data.totalCourses}
                                    icon={<BookOpen />}
                                    color="from-pink-500 to-pink-700"
                                    onClick={() => handleCardClick("courses")}
                                />
                            </>
                        )}

                        {role === "Hr" && (
                            <>
                                <ClickableCard
                                    title="Placements"
                                    value={data.totalPlacements}
                                    icon={<Briefcase />}
                                    color="from-green-500 to-green-700"
                                    onClick={() => handleCardClick("placements")}
                                />
                                <ClickableCard
                                    title="Resumes"
                                    value={data.totalResumes}
                                    icon={<FileText />}
                                    color="from-purple-500 to-purple-700"
                                    onClick={() => handleCardClick("resumes")}
                                />
                            </>
                        )}
                    </div>

                    {/* 📊 CHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="font-semibold mb-4">Overall Statistics</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="font-semibold mb-4">Placements vs Resumes</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={60}
                                        outerRadius={100}
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* 🎨 CLICKABLE CARD */
function ClickableCard({ title, value, icon, color, onClick }) {
    return (
        <div
            className={`bg-gradient-to-t ${color} text-white rounded-xl p-5 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm opacity-90 whitespace-nowrap">{title}</p>
                    <h2 className="text-3xl font-bold">{value}</h2>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="bg-white/20 p-2 rounded-full">
                        {icon}
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                </div>
            </div>
        </div>
    );
}
