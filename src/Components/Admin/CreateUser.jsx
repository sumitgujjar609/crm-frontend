import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/create-user",
                formData
            );

            setMessage(response.data.message);

            // Reset Form
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: "",
            });

        } catch (error) {
            console.log(error);

            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold mb-5 text-center">Create User</h2>

            {message && (
                <p className="text-center text-sm text-green-600 mb-3">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                {/* Role */}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Role</option>
                    <option value="counsellor">Counsellor</option>
                    <option value="hr">HR</option>
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
