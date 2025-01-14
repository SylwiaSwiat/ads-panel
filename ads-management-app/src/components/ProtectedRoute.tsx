import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const pass =
    sessionStorage.getItem("auth") || prompt("Please enter password");

  if (!pass) {
    return <Navigate to="/" />;
  } else if (pass !== import.meta.env.VITE_PASSWORD) {
    sessionStorage.removeItem("auth");
    return <Navigate to="/error" />;
  }

  sessionStorage.setItem("auth", pass!);
  return children;
};

export default ProtectedRoute;
