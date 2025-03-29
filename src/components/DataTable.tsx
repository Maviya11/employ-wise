import { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Trash, Pencil } from "lucide-react";
import DialogPage from "./Dialog";
import useData, { handleRowClick } from "@/hooks/useData";
import Spinner from "./Spinner";

const baseUrl = import.meta.env.VITE_BASE_URL;

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface Props {
  page: number;
  setNoOfPage: (number: number) => void;
}

const DataTable = ({ page, setNoOfPage }: Props) => {
  const { data, setData, isLoading, error } = useData({ page, setNoOfPage });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  // const [data, setData] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/api/users?page=${page}`);
  //       setData(response.data.data);
  //       setNoOfPage(response.data.total_pages);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     }
  //   };
  //   fetchData();
  // }, [page]);

  // Handle delete
  const deleteUser = async (id: number) => {
    const currentData = data;
    try {
      // Update UI first
      setData(data.filter((user) => user.id !== id));

      // Delete the user
      await axios.delete(`${baseUrl}/api/users/${id}`);

      alert("Deleted successfully");
    } catch (e) {
      // Revert back the UI if req fails
      setData(currentData);
      alert("Failed to delete data");
    }
  };

  // Handle user update
  const updateUser = async (id: number, newUser: User) => {
    const currentData = data;
    try {
      // Update UI first
      setData(data.map((user) => (id === user.id ? newUser : user)));

      // Update the user
      await axios.put(`${baseUrl}/api/users/${id}`, newUser);

      alert("Updated successfully");
    } catch {
      // Revert back the UI if req fails
      setData(currentData);
      alert("Failed to update data");
    }
  };

  return (
    <div>
      <Table className="border max-w-5xl mx-auto mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="max-[350px]:hidden">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="max-[500px]:hidden">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((user, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(setSelectedUser, setIsOpen, user)}
            >
              <TableCell className="max-[350px]:hidden">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>avatar</AvatarFallback>{" "}
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="max-[500px]:hidden">
                <Button
                  onClick={() => deleteUser(user.id)}
                  variant="ghost"
                  className="bg-transparent text-red-400 hover:text-red-400 border border-red-300 text-xs"
                >
                  <Trash />
                  <span className="max-[550px]:hidden">Delete</span>
                </Button>
              </TableCell>
              <TableCell className="max-[500px]:hidden">
                <Button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsOpen(true);
                  }}
                  variant="link"
                  className="cursor-pointer text-xs"
                >
                  <Pencil />
                  <span className="max-[550px]:hidden">Edit</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isOpen && (
        <DialogPage
          user={selectedUser}
          setIsOpen={() => setIsOpen(false)}
          updateUser={(id, newUser) => updateUser(id, newUser)}
          deleteUser={deleteUser}
        />
      )}

      {isLoading && <Spinner />}

      {error && (
        <div className="text-red-500 font-semibold text-base">
          Failed to fetch data
        </div>
      )}
    </div>
  );
};

export default DataTable;
