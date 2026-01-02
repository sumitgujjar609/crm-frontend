import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../Services/Api";
import { useAuth } from "../../Context/AuthContext";

export default function CourseList() {
    const { auth } = useAuth();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editCourse, setEditCourse] = useState(null);
    const [saving, setSaving] = useState(false);

    /* ================= Fetch all courses ================= */
    const loadCourses = async () => {
        try {
            const res = await Api.get("/course/get-all-course");
            setCourses(res?.data?.data || []);
        } catch {
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    /* ================= Delete ================= */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            await Api.delete(`/course/delete-course/${id}`);
            toast.success("Course deleted successfully");
            loadCourses();
        } catch {
            toast.error("Failed to delete course");
        }
    };

    /* ================= Edit ================= */
    const handleEditClick = (course) => {
        setEditCourse({ ...course });
    };

    const handleUpdate = async () => {
        const { name, duration, fees } = editCourse;
        if (!name || !duration || !fees) {
            toast.error("Name, duration and fees are required");
            return;
        }

        setSaving(true);
        try {
            await Api.put(`/course/update-course/${editCourse._id}`, editCourse);
            toast.success("Course updated successfully");
            setEditCourse(null);
            loadCourses();
        } catch {
            toast.error("Failed to update course");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">Courses List</h2>

            {loading ? (
                <p>Loading courses...</p>
            ) : courses.length === 0 ? (
                <p>No courses available</p>
            ) : (
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="p-4 border rounded flex justify-between items-center hover:shadow-md transition"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {course.name}
                                </h3>
                                <p>Duration: {course.duration}</p>
                                <p>Fees: {course.fees}</p>
                                {course.description && (
                                    <p>Description: {course.description}</p>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                {/* Edit */}
                                <button
                                    onClick={() => handleEditClick(course)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded
                                               hover:bg-yellow-600 hover:scale-105 transition"
                                >
                                    Edit
                                </button>

                                {/* Delete → Admin only */}
                                {auth.role === "Admin" && (
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded
                                                   hover:bg-red-600 hover:scale-105 transition"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {editCourse && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Edit Course
                        </h2>

                        <div className="space-y-3">
                            <input
                                value={editCourse.name}
                                onChange={(e) =>
                                    setEditCourse({ ...editCourse, name: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Course Name"
                            />

                            <input
                                value={editCourse.duration}
                                onChange={(e) =>
                                    setEditCourse({ ...editCourse, duration: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Duration"
                            />

                            <input
                                value={editCourse.fees}
                                onChange={(e) =>
                                    setEditCourse({ ...editCourse, fees: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Fees"
                            />

                            <textarea
                                value={editCourse.description || ""}
                                onChange={(e) =>
                                    setEditCourse({
                                        ...editCourse,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Description"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setEditCourse(null)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
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
