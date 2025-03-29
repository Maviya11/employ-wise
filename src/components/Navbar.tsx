import { useContext } from "react";
import { Button } from "./ui/button";
import { AuthenticationContext } from "@/App";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const setAuthToken = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    if (setAuthToken) setAuthToken(false);
    navigate("/login");
  };

  return (
    <header className="bg-white h-16 shadow">
      <nav className="border-b flex h-full justify-between items-center p-2">
        {/* Logo section */}
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="ml-2 text-xl font-semibold">Logo</span>
        </div>

        <Button onClick={logoutUser} variant="ghost">
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
