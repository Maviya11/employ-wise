import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Props {
  setIsOpen: () => void;
  updateUser: (id: number, user: User) => void;
  deleteUser: (id: number) => void;
  user: User | undefined;
}

const DialogPage = ({ setIsOpen, user, updateUser, deleteUser }: Props) => {
  const [userData, setUserData] = useState<User | undefined>(user);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof User, value: string) => {
    if (userData) {
      setUserData({ ...userData, [field]: value });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevents page refresh

    if (!userData?.email || !validateEmail(userData.email)) {
      setError("Invalid email format");
      return;
    }

    // Update the user
    if (userData) {
      updateUser(userData.id, userData);
      setIsOpen();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={setIsOpen}
        className="w-full h-screen bg-black/15 absolute inset-0 z-10"
      ></div>

      {/* Dialog */}
      <form className="border w-full max-w-md bg-white shadow p-5 rounded-md z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <h2 className="text-lg font-semibold">Edit profile</h2>
          <p>Make changes to your profile here.</p>
          <Avatar className="my-2 mx-auto size-20">
            <AvatarImage src={userData?.avatar} />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-red-400 font-normal mx-auto block w-max">
          {error || ""}
        </span>
        <div className="flex flex-col gap-5 my-5">
          <div className="flex justify-between items-center min-[400px]:gap-x-10">
            <Label htmlFor="firstName" className="text-left">
              First name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={userData?.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center min-[400px]:gap-x-10">
            <Label htmlFor="lastName" className="text-left">
              Last name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={userData?.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center min-[400px]:gap-x-10">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={userData?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="flex">
          <Button
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              if (userData) {
                deleteUser(userData.id);
                setIsOpen();
              }
            }}
            className="block mx-auto min-[500px]:hidden"
          >
            Delete
          </Button>
          <Button onClick={onSubmit} className="block mx-auto">
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default DialogPage;
