import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back to Login Page
        </Link>
      </div>
    </div>
  );
}
