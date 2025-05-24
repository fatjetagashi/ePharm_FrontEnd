import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "@/lib/axios"; // adjust based on your axios setup
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRoleState(storedRole);
  }, []);

  const setRole = (newRole: string | null) => {
    if (newRole) {
      localStorage.setItem("role", newRole);
    } else {
      localStorage.removeItem("role");
    }
    setRoleState(newRole);
  };

  const logout = async () => {
    try {
      await axios.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
    }

    localStorage.clear();
    setRole(null);
    window.location.href = "/";

  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);