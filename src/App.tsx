import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import "./App.css";
import Home from "./components/Home";

export const AuthenticationContext = createContext<React.Dispatch<
  React.SetStateAction<string | boolean>
> | null>(null);

function App() {
  const [authToken, setAuthToken] = useState<boolean | string>(
    JSON.parse(localStorage.getItem("authToken") || "false")
  );

  return (
    <>
      <AuthenticationContext.Provider value={setAuthToken}>
        <Router>
          <Routes>
            {/* Public routes: Accessible to anyone */}
            <Route
              path="/login"
              element={!authToken ? <LoginForm /> : <Navigate to="/" replace />}
            />
            {/* Private routes: Accessible to authenticated users only */}
            <Route
              path="/"
              element={authToken ? <Home /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </Router>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;
