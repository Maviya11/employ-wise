import { useContext, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "@/App";
import Spinner from "./Spinner";

const baseUrl = import.meta.env.VITE_BASE_URL;

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const setAuthToken = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page refresh
    setIsLoading(true);

    try {
      // Hnandel token response
      const response = await axios.post(`${baseUrl}/api/login`, formData);
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      if (setAuthToken) setAuthToken(response.data.token);
      navigate("/");
    } catch (e) {
      setError("Incorrect Credentails");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Login to your account
              </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            {error && (
              <div className="px-6">
                <div className="text-center border-dashed border-2 p-1 bg-red-300/20 border-red-300 rounded-md text-red-400">
                  {error}
                </div>
              </div>
            )}

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email@example.com"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {/* Show spinner when authenticating */}
                      {isLoading ? <Spinner /> : "Login"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
