import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../Services/Api";

export default function Placement() {
    const [placements, setPlacements] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        studentName: "",
        companyName: "",
        position: "",
        date: "",
        package: "",
    });

    /* =========================
       GET ALL PLACEMENTS
    ========================= */
    const getAllPlacements = async () => {
        try {
            const res = await Api.get("/placement/get-all-placement");
            setPlacements(res.data.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch placements");
        }
    };

    useEffect(() => {
        getAllPlacements();
    }, []);

    /* =========================
       DELETE PLACEMENT
    ========================= */
    const deletePlacement = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await Api.delete(`/placement/delete-placement/${id}`);
            toast.success("Placement deleted");
            getAllPlacements();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    /* =========================
       HANDLE CHANGE
    ========================= */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /* =========================
       ADD PLACEMENT
    ========================= */
    const addPlacement = async (e) => {
        e.preventDefault();

        try {
            await Api.post("/placement/add-placement", formData);
            toast.success("Placement added");

            setShowModal(false);
            setFormData({
                studentName: "",
                companyName: "",
                position: "",
                date: "",
                package: "",
            });

            getAllPlacements();
        } catch (error) {
            console.error(error);
            toast.error("Add placement failed");
        }
    };

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Placement Dashboard</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Placement
                </button>
            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Student Name</th>
                        <th className="border p-2">Company</th>
                        <th className="border p-2">Position</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Package</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {placements.length > 0 ? (
                        placements.map((item) => (
                            <tr key={item._id}>
                                <td className="border p-2 text-center">{item.studentName}</td>
                                <td className="border p-2 text-center">{item.companyName}</td>
                                <td className="border p-2 text-center">{item.position}</td>
                                <td className="border p-2 text-center">
                                    {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="border p-2 text-center">{item.package}</td>
                                <td className="border p-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm
                                       ${item.status === "Placed" ? "bg-green-600" : "bg-red-600"}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => deletePlacement(item._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4">
                                No placements found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 w-96 rounded">
                        <h2 className="text-xl font-bold mb-4">Add Placement</h2>

                        <form onSubmit={addPlacement} className="space-y-3">
                            <input
                                type="text"
                                name="studentName"
                                placeholder="Student Name"
                                value={formData.studentName}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
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
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />

                            <input
                                type="text"
                                name="package"
                                placeholder="Package (5 LPA)"
                                value={formData.package}
                                onChange={handleChange}
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


