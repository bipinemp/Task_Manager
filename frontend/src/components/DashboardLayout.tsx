import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/authContext";

const DashboardLayout = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex gap-x-10 overflow-x-hidden">
      <Sidebar />
      <div className="max-w-[1000px] w-full py-10 px-5 ml-60">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
