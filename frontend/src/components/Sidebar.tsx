import { sidebarLinks } from "../constants/sidebarLinks";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../apis/auth/auth";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { auth } = useAuth();

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("auth");
          window.location.reload();
        }
      })
      .catch((_) => toast.error("Something went wrong, Try again later."));
  };

  return (
    <aside className="w-[200px] fixed left-0 top-0 h-screen bg-primary text-secondary flex flex-col justify-between">
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col py-3 mx-2 rounded-md mt-2 px-5 bg-secondary/20 border border-secondary/40">
          <h3>{auth?.name}</h3>
          <p className="text-sm opacity-80">{auth?.email}</p>
        </div>

        <div className="flex flex-col gap-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              to={link.url}
              key={link.title}
              end={link.url === "/dashboard"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/20" : ""
                } font-semibold text-lg tracking-wide py-3 px-5 transition hover:bg-secondary/20`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <Button
        onClick={handleLogout}
        variant={"outline"}
        className="py-3 px-5 bg-secondary/20 mx-2 mb-5 hover:border-primary"
      >
        <LogOut /> Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
