import { useState } from "react";
import DataTable from "./DataTable";
import Navbar from "./Navbar";
import PaginationBar from "./Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState<number>(0);

  return (
    <>
      <Navbar />
      <DataTable page={page} setNoOfPage={(number) => setNoOfPage(number)} />
      <PaginationBar
        page={page}
        noOfPage={noOfPage}
        setPage={(number) => {
          setPage(number);
        }}
      />
    </>
  );
};

export default Home;
