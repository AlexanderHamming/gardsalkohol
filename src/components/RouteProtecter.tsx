import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RouteProtecter = ({ redirect = "/inloggning" }: { redirect?: string }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={redirect} replace />;
};

export default RouteProtecter;
