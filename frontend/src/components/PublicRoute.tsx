import { ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
