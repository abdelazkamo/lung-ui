import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ImageUpload } from "./pages/home";
import SignIn from "./pages/public/signIn";
import SignUp from "./pages/public/signUp";
import ForgotPassword from "./pages/public/forgotPassword";
import ResetPassword from "./pages/public/resetPassword";

function App() {
  // Check if a token is present in local storage
  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return <Navigate to="/sign-in" />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ImageUpload />
            </RequireAuth>
          }
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id" element={<ResetPassword />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
