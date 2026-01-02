
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/LoginForm/Login.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import VerifyOtp from "./Pages/LoginForm/VerifyOtp.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";
import Unauthorized from "./Components/Admin/Unauthorized.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import Profile from "./Pages/Profiles/Profile.jsx";
import AddStudent from "./Pages/Students/AddStudent.jsx";
import StudentsList from "./Pages/Students/StudentsList.jsx";
import AddCourse from "./Pages/Courses/AddCourse.jsx";
import CourseList from "./Pages/Courses/CoursesList.jsx";
import Resume from "./Pages/Resumes/Resume.jsx";
import Placement from "./Pages/Placement/Placement.jsx";




function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-student" element={< AddStudent />} />
          <Route path="/students" element={< StudentsList />} />
          <Route path="/add-course" element={< AddCourse />} />
          <Route path="/courses" element={< CourseList />} />
          <Route path="/resumes" element={< Resume />} />
          <Route path="/placements" element={< Placement />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["Admin", "Hr", "Counsellor"]}>
                <Dashboard />
              </ProtectedRoutes>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="*"
            element={<div className="p-8 text-xl">Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
