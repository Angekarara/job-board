import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

function App() {
  return (
    <div className="bg-secondary min-h-screen">
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      {/* </Layout> */}
    </div>
  );
}
export default App;
