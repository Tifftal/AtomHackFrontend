import { useContext } from "react";
import { AuthContext } from "../../shared/auth";

export const useAuth = () => useContext(AuthContext);
