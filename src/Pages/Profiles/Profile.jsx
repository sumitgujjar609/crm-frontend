



// import { useEffect, useState } from "react";
// import Api from "../../Services/Api"; // axios instance
// import toast from "react-hot-toast";

// export default function Profile() {

//     const [profile, setProfile] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         role: "",
//         profile: "",
//     });

//     const [isEdit, setIsEdit] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // Change Password Modal State
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [passwordData, setPasswordData] = useState({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     });
//     const [passwordLoading, setPasswordLoading] = useState(false);

//     // ==========================
//     // 👉 UPDATE PROFILE PHOTO
//     // ==========================
//     const handlePhotoChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("profileImage", file); // backend key = photo

//         try {
//             await Api.put(
//                 "/profile/upload-photo",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             toast.success("Profile photo updated");
//             fetchProfile(); // refresh profile

//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to update profile photo");
//         }
//     };



//     // ==========================
//     // 👉 GET PROFILE API
//     // ==========================
//     const fetchProfile = async () => {
//         try {
//             const res = await Api.get("/profile/get-profile");
//             setProfile(res.data.data || {});
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to load profile");
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     // ==========================
//     // 👉 UPDATE PROFILE API
//     // ==========================
//     const handleUpdate = async () => {
//         try {
//             setLoading(true);

//             await Api.put("/profile/update-profile", {
//                 name: profile.name,
//                 phone: profile.phone,
//                 profile: profile.profile,
//             });

//             toast.success("Profile updated successfully");
//             setIsEdit(false);
//             fetchProfile();

//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to update profile");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ==========================
//     // 👉 CHANGE PASSWORD API
//     // ==========================
//     const handleChangePassword = async () => {

//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             toast.error("New password and confirm password do not match");
//             return;
//         }

//         try {
//             setPasswordLoading(true);

//             await Api.put("/profile/change-password", {
//                 oldPassword: passwordData.oldPassword,
//                 newPassword: passwordData.newPassword,
//             });

//             toast.success("Password changed successfully");

//             setIsModalOpen(false);
//             setPasswordData({
//                 oldPassword: "",
//                 newPassword: "",
//                 confirmPassword: "",
//             });

//         } catch (error) {
//             console.error(error);
//             toast.error(
//                 error?.response?.data?.message || "Failed to change password"
//             );
//         } finally {
//             setPasswordLoading(false);
//         }
//     };

//     return (
//         <div className="w-6xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
//             {/* Header */}
//             <div className="flex justify-between items-center  mb-6">
//                 <h2 className="text-xl font-semibold">Profile Information</h2>
//                 <button
//                     onClick={() => isEdit ? handleUpdate() : setIsEdit(true)}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//                 >
//                     {isEdit ? "Save Profile" : "Edit Profile"}
//                 </button>
//             </div>

//             {/* Profile Section */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Left */}
//                 <div className="text-center">
//                     <img
//                         src={
//                             profile.profile ||
//                             "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
//                         }
//                         alt="profile"
//                         className="w-28 h-28 rounded-full mx-auto"
//                     />
//                     <label className="text-indigo-600 text-sm mt-2 cursor-pointer block">
//                         Change Photo
//                         <input
//                             type="file"
//                             accept="image/*"
//                             hidden
//                             onChange={handlePhotoChange}
//                         />
//                     </label>


//                     <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
//                         Active Account
//                     </span>
//                 </div>

//                 {/* Right */}
//                 <div className="md:col-span-2 grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-500 text-sm">Full Name</p>
//                         <input
//                             type="text"
//                             value={profile.name}
//                             disabled={!isEdit}
//                             onChange={(e) =>
//                                 setProfile({ ...profile, name: e.target.value })
//                             }
//                             className="w-full border rounded p-2"
//                         />
//                     </div>

//                     <div>
//                         <p className="text-gray-500 text-sm">Email</p>
//                         <input
//                             type="text"
//                             value={profile.email}
//                             disabled
//                             className="w-full border rounded p-2 bg-gray-100"
//                         />
//                     </div>

//                     <div>
//                         <p className="text-gray-500 text-sm">Phone</p>
//                         <input
//                             type="text"
//                             value={profile.phone}
//                             disabled={!isEdit}
//                             onChange={(e) =>
//                                 setProfile({ ...profile, phone: e.target.value })
//                             }
//                             className="w-full border rounded p-2"
//                         />
//                     </div>

//                     <div>
//                         <p className="text-gray-500 text-sm">Role</p>
//                         <input
//                             type="text"
//                             value={profile.role}
//                             disabled
//                             className="w-full border rounded p-2 bg-gray-100"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Security Section */}
//             <div className="border-t mt-8 pt-6 flex justify-between items-center">
//                 <div>
//                     <h3 className="font-semibold">Security</h3>
//                     <p className="text-sm text-gray-500">
//                         Change your password regularly to keep your account secure.
//                     </p>
//                 </div>

//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg"
//                 >
//                     Change Password
//                 </button>
//             </div>

//             {/* Change Password Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg p-6 w-96">
//                         <h3 className="text-lg font-semibold mb-4">
//                             Change Password
//                         </h3>

//                         <input
//                             type="password"
//                             placeholder="Old Password"
//                             value={passwordData.oldPassword}
//                             onChange={(e) =>
//                                 setPasswordData({
//                                     ...passwordData,
//                                     oldPassword: e.target.value,
//                                 })
//                             }
//                             className="w-full border rounded p-2 mb-3"
//                         />

//                         <input
//                             type="password"
//                             placeholder="New Password"
//                             value={passwordData.newPassword}
//                             onChange={(e) =>
//                                 setPasswordData({
//                                     ...passwordData,
//                                     newPassword: e.target.value,
//                                 })
//                             }
//                             className="w-full border rounded p-2 mb-3"
//                         />

//                         <input
//                             type="password"
//                             placeholder="Confirm New Password"
//                             value={passwordData.confirmPassword}
//                             onChange={(e) =>
//                                 setPasswordData({
//                                     ...passwordData,
//                                     confirmPassword: e.target.value,
//                                 })
//                             }
//                             className="w-full border rounded p-2 mb-4"
//                         />

//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="px-4 py-2 rounded border"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={handleChangePassword}
//                                 disabled={passwordLoading}
//                                 className="px-4 py-2 rounded bg-indigo-600 text-white"
//                             >
//                                 {passwordLoading ? "Saving..." : "Save"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }




import { useEffect, useState } from "react";
import Api from "../../Services/Api";
import toast from "react-hot-toast";

export default function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        profileImage: "",
    });

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // ==========================
    // 👉 UPDATE PROFILE PHOTO
    // ==========================
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const res = await Api.put(
                "/profile/upload-photo",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProfile((prev) => ({
                ...prev,
                profileImage: res.data.profileImage,
                        }));
            toast.success("Profile photo updated");

        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile photo");
        }
    };


    // ==========================
    // 👉 GET PROFILE
    // ==========================
    const fetchProfile = async () => {
        try {
            const res = await Api.get("/profile/get-profile");
            setProfile(res.data.data || {});
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ==========================
    // 👉 UPDATE PROFILE
    // ==========================
    const handleUpdate = async () => {
        try {
            setLoading(true);

            await Api.put("/profile/update-profile", {
                name: profile.name,
                phone: profile.phone,
            });

            toast.success("Profile updated");
            setIsEdit(false);
            fetchProfile();

        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // 👉 CHANGE PASSWORD
    // ==========================
    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setPasswordLoading(true);

            await Api.put("/profile/change-password", {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            });

            toast.success("Password changed");
            setIsModalOpen(false);
            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="w-6xl mx-auto bg-white rounded-xl shadow p-6 mt-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button
                    onClick={() => isEdit ? handleUpdate() : setIsEdit(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                    {isEdit ? "Save Profile" : "Edit Profile"}
                </button>
            </div>

            {/* Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left */}
                <div className="text-center">
                    <img
                        src={
                            profile.profileImage
                                ? `${profile.profileImage}?t=${Date.now()}` // ✅ CACHE FIX
                                : "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                        }
                        alt="profile"
                        className="w-28 h-28 rounded-full mx-auto"
                    />

                    <label className="text-indigo-600 text-sm mt-2 cursor-pointer block">
                        Change Photo
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handlePhotoChange}
                        />
                    </label>

                    <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        Active Account
                    </span>
                </div>

                {/* Right */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm">Full Name</p>
                        <input
                            type="text"
                            value={profile.name}
                            disabled={!isEdit}
                            onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                            }
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <input
                            type="text"
                            value={profile.email}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <input
                            type="text"
                            value={profile.phone}
                            disabled={!isEdit}
                            onChange={(e) =>
                                setProfile({ ...profile, phone: e.target.value })
                            }
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Role</p>
                        <input
                            type="text"
                            value={profile.role}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="border-t mt-8 pt-6 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">Security</h3>
                    <p className="text-sm text-gray-500">
                        Change your password regularly to keep your account secure.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg"
                >
                    Change Password
                </button>
            </div>

            {/* Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            Change Password
                        </h3>

                  
                        <div className="relative">
                            <input
                                type={showPassword.old ? "text" : "password"}
                                placeholder="Old Password"
                                value={passwordData.oldPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        oldPassword: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 pr-10"
                            />

                            <span
                                onClick={() =>
                                    setShowPassword({ ...showPassword, old: !showPassword.old })
                                }
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            >
                                {showPassword.old ? "🙈" : "👁️"}
                            </span>
                        </div>


                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                placeholder="New Password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 pr-10"
                            />

                            <span
                                onClick={() =>
                                    setShowPassword({ ...showPassword, new: !showPassword.new })
                                }
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            >
                                {showPassword.new ? "🙈" : "👁️"}
                            </span>
                        </div>


                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                setPasswordData({
                                    ...passwordData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="w-full border rounded p-2 mb-4"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleChangePassword}
                                disabled={passwordLoading}
                                className="px-4 py-2 rounded bg-indigo-600 text-white"
                            >
                                {passwordLoading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

