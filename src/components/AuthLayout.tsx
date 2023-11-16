import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}
const Protected = ({ children, authentication }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authentication, authStatus]);

  return loader ? <p>Loading...</p> : <> {children}</>;
};

export default Protected;
