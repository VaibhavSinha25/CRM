import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Don't show logout button if user is not logged in
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Welcome, {user.name || user.email}!
      </span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
