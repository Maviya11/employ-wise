import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UseFetchUsersProps {
  page: number;
  setNoOfPage: (number: number) => void;
}

export const useData = ({ page, setNoOfPage }: UseFetchUsersProps) => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseUrl}/api/users?page=${page}`);
        setData(response.data.data);
        setNoOfPage(response.data.total_pages);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, setNoOfPage]);

  return { data, setData, isLoading, setIsLoading, error, setError };
};

export default useData;

export const handleRowClick = (
  setSelectedUser: (user: User) => void,
  setIsOpen: (isOpen: boolean) => void,
  user: User
) => {
  if (window.innerWidth < 500) {
    setSelectedUser(user);
    setIsOpen(true);
  }
};
