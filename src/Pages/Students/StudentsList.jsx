


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../Services/Api";
import { useAuth } from "../../Context/AuthContext";

export default function StudentsList() {
    const { auth } = useAuth();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editStudent, setEditStudent] = useState(null);
    const [saving, setSaving] = useState(false);

    // 🔹 Toggle state
    const [showMyStudents, setShowMyStudents] = useState(false);

    // =============================
    // Fetch all students
    // =============================
    const loadStudents = async () => {
        try {
            const res = await Api.get("/student/get-all-students");
            setStudents(res?.data?.data || []);
        } catch (err) {
            toast.error("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    // =============================
    // Frontend filter
    // =============================
    const displayedStudents = showMyStudents
        ? students.filter(
            (s) => s.createdBy?._id === auth?.userId
        )
        : students;

    // =============================
    // Delete student (Admin only)
    // =============================
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await Api.delete(`/student/delete-student/${id}`);
            toast.success("Student deleted successfully");
            loadStudents();
        } catch (err) {
            toast.error("Failed to delete student");
        }
    };

    // =============================
    // Edit student
    // =============================
    const handleEditClick = (student) => {
        setEditStudent({ ...student });
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            await Api.put(`/student/update-student/${editStudent._id}`, editStudent);
            toast.success("Student updated successfully");
            setEditStudent(null);
            loadStudents();
        } catch (err) {
            toast.error("Failed to update student");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Students
            </h1> */}

            {/* 🔹 Toggle Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setShowMyStudents(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium
                        ${!showMyStudents
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                >
                    All Students
                </button>

                <button
                    onClick={() => setShowMyStudents(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium
                        ${showMyStudents
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                >
                    My Students
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-500">
                    Loading students...
                </p>
            )}

            {/* Student Cards */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedStudents.length > 0 ? (
                        displayedStudents.map((s) => (
                            <div
                                key={s._id}
                                className="bg-blue-100 rounded-2xl shadow hover:shadow-lg transition p-5"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                                    <img
                                        src={
                                            s.photo
                                                ? `http://localhost:5000/uploads/${s.photo}`
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    s.name || "Student"
                                                )}&background=0D8ABC&color=fff`
                                        }
                                        alt={s.name}
                                        className="w-14 h-14 rounded-full object-cover border"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {s.name}
                                    </h2>
                                </div>

                                {/* Details */}
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p><b>Course:</b> {s.course}</p>
                                    <p><b>Duration:</b> {s.duration}</p>
                                    <p><b>Email:</b> {s.email}</p>
                                    <p><b>Phone:</b> {s.phone}</p>
                                    <p>
                                        <b>Created By:</b>{" "}
                                        {s.createdBy?.name} ({s.createdBy?.role})
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-4 mt-5 pt-4 border-t">
                                    <button
                                        onClick={() => handleEditClick(s)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Edit
                                    </button>

                                    {auth?.role === "Admin" && (
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">
                            No students found
                        </p>
                    )}
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {editStudent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Edit Student
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={editStudent.name}
                                onChange={(e) =>
                                    setEditStudent({ ...editStudent, name: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Name"
                            />

                            <input
                                type="email"
                                value={editStudent.email}
                                onChange={(e) =>
                                    setEditStudent({ ...editStudent, email: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Email"
                            />

                            <input
                                type="text"
                                value={editStudent.phone}
                                onChange={(e) =>
                                    setEditStudent({ ...editStudent, phone: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Phone"
                            />

                            <select
                                value={editStudent.course}
                                onChange={(e) =>
                                    setEditStudent({ ...editStudent, course: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option>MERN Stack</option>
                                <option>Full Stack Java</option>
                                <option>Python</option>
                                <option>Data Science</option>
                                <option>Cyber Security</option>
                            </select>

                            <select
                                value={editStudent.duration}
                                onChange={(e) =>
                                    setEditStudent({ ...editStudent, duration: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option>3 Months</option>
                                <option>6 Months</option>
                                <option>1 Year</option>
                                <option>2 Years</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setEditStudent(null)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
