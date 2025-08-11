import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AuthGuard from "./components/auth/AuthGuard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        />
      </Routes>
    </Layout>
  );
}
export default App;
