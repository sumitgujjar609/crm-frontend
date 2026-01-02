import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../Services/Api";
import { toast } from "react-hot-toast";

export default function AddCourse() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        fees: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    // Input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, duration, fees } = formData;
        if (!name || !duration || !fees) {
            toast.error("Name, Duration, and Fees are required!");
            return;
        }

        try {
            setLoading(true);
            const res = await callApi("/course/add-course", "POST", formData);
            toast.success(res.message || "Course added successfully!");
            navigate("/courses"); // navigate to courses page
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add course");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Name */}
                <div>
                    <label className="block text-gray-700 mb-1">Course Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter course name"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-gray-700 mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter duration (e.g. 6 months)"
                    />
                </div>

                {/* Fees */}
                <div>
                    <label className="block text-gray-700 mb-1">Fees</label>
                    <input
                        type="text"
                        name="fees"
                        value={formData.fees}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter fees (e.g. 45000)"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter course description (optional)"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Course"}
                </button>
            </form>
        </div>
    );
}
