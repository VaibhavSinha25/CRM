import { BrowserRouter, Routes, Route } from "react-router-dom";
import SegmentBuilder from "./pages/SegmentBuilder";
import CampaignPage from "./pages/CampaignPage";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton"; // Import LogoutButton
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";

const PrivateRoute = ({ element }) => {
  const { token, user } = useAuth();
  return token ? (
    element
  ) : (
    <p className="p-6">🔐 Please log in to access this page.</p>
  );
};

const AppContent = () => {
  const { user } = useAuth(); // Get user to show/hide login button

  return (
    <Routes>
      <Route path="/" element={<HomePage user={user} />} />
      <Route
        path="/Segments"
        element={<PrivateRoute element={<SegmentBuilder />} />}
      />
      <Route
        path="/Campaigns"
        element={<PrivateRoute element={<CampaignPage />} />}
      />
      <Route
        path="/AddCustomer"
        element={<PrivateRoute element={<CustomersPage />} />}
      />
    </Routes>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
