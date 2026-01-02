import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../Services/Api"; 

export default function Resume() {
    const [resumes, setResumes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [resumeFile, setResumeFile] = useState(null); // optional, backend ignore

    const [formData, setFormData] = useState({
        candidateName: "",
        email: "",
        phone: "",
        position: "",
        experience: ""
    });

    /* =========================
       GET ALL RESUMES
    ========================= */
    const getAllResumes = async () => {
        try {
            const res = await Api.get("/resume/get-all-resume");
            setResumes(res.data.data || []);
        } catch (error) {
            console.log("Get Resume Error:", error);
            toast.error("Failed to fetch resumes");
        }
    };

    useEffect(() => {
        getAllResumes();
    }, []);

    /* =========================
       DELETE RESUME
    ========================= */
    const deleteResume = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await Api.delete(`/resume/delete-resume/${id}`);
            toast.success("Resume deleted successfully");
            getAllResumes();
        } catch (error) {
            console.log("Delete Resume Error:", error);
            toast.error("Failed to delete resume");
        }
    };

    /* =========================
       HANDLE INPUT 
    ========================= */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /* =========================
       ADD RESUME (WITHOUT FORM-DATA)
       file optional, backend ignore
    ========================= */
    const addResume = async (e) => {
        e.preventDefault();

        try {
            const data = {
                candidateName: formData.candidateName,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                experience: formData.experience
            };

          

            await Api.post("/resume/add-resume", data);

            toast.success("Resume added successfully");

            setShowModal(false);
            setResumeFile(null);
            setFormData({
                candidateName: "",
                email: "",
                phone: "",
                position: "",
                experience: ""
            });

            getAllResumes();
        } catch (error) {
            console.log("Add Resume Error:", error);
            toast.error("Failed to add resume");
        }
    };

    // Ststus Color
    const getStatusColor = (status) => {
        switch (status) {
            case "New":
                return "bg-blue-500";
            case "Reviewed":
                return "bg-yellow-500";
            case "Shortlisted":
                return "bg-green-600";
            case "Selected":
                return "bg-purple-600";
            case "Rejected":
                return "bg-red-600";
            default:
                return "bg-gray-500";
        }
    };



    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Resume Dashboard</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Resume
                </button>
            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Position</th>
                        <th className="border p-2">Experience</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.length > 0 ? resumes.map((resume) => (
                        <tr key={resume._id}>
                            <td className="border p-2">{resume.candidateName}</td>
                            <td className="border p-2">{resume.email}</td>
                            <td className="border p-2">{resume.phone}</td>
                            <td className="border p-2">{resume.position}</td>
                            <td className="border p-2">{resume.experience}</td>
                            {/* <td className="border p-2">{resume.status}</td> */}
                            <td className="border p-2">
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm font-semibold
        ${getStatusColor(resume.status)}`}
                                >
                                    {resume.status}
                                </span>
                            </td>



                            <td className="border p-2">
                                <button
                                    onClick={() => deleteResume(resume._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4">
                                No resumes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 w-96 rounded">
                        <h2 className="text-xl font-bold mb-4">Add Resume</h2>

                        <form onSubmit={addResume} className="space-y-3">
                            <input
                                type="text"
                                name="candidateName"
                                placeholder="Candidate Name"
                                value={formData.candidateName}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="text"
                                name="experience"
                                placeholder="Experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full border p-2"
                            />

                            {/* FILE UPLOAD - optional, backend ignore  */}
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResumeFile(e.target.files[0])}
                                className="w-full border p-2"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
