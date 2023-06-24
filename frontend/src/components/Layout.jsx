import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  /*const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
  }, [api]);*/

  return (
    <React.Fragment>
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
