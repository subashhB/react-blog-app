import { useAppDispatch } from "../../hooks/reduxHooks";
import authService from "../../services/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const disptach = useAppDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => disptach(logout()))
      .catch((error) => console.error(error));
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-button rouded-full"
      onClick={() => {
        logoutHandler();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
