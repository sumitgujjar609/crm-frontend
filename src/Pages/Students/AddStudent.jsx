import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../Services/Api";

export default function AddStudent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        duration: "",   
    });


    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await Api.post("/student/add-student", form);
            toast.success("Student added successfully 🎉");
            navigate("/students");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-5">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    Add New Student
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Fill student details carefully
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Student Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="10 digit number"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Course
                        </label>
                        <select
                            name="course"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Course</option>
                            <option value="MERN Stack">MERN Stack</option>
                            <option value="Full Stack Java">Full Stack Java</option>
                            <option value="Python">Python</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Course Duration
                        </label>
                        <select
                            name="duration"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.duration}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Duration</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="9 Months">9 Months</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                        </select>
                    </div>


                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
                        >
                            {loading ? "Submitting..." : "Add Student"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/students")}
                            className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
