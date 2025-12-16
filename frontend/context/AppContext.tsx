import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, logoutUser } from "../services/authService";

/* ---------------- TYPES ---------------- */

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------- Restore session ---------- */
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Restore auth failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- LOGIN ---------- */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const res = await loginUser({ email, password });

      if (!res.token || !res.data) {
        throw new Error("Invalid login response");
      }

      await AsyncStorage.multiSet([
        ["authToken", res.token],
        ["userData", JSON.stringify(res.data)],
      ]);

      setToken(res.token);
      setUser(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- REGISTER ---------- */
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      const res = await registerUser({ name, email, password });

      if (!res.token || !res.data) {
        throw new Error("Invalid register response");
      }

      await AsyncStorage.multiSet([
        ["authToken", res.token],
        ["userData", JSON.stringify(res.data)],
      ]);

      setToken(res.token);
      setUser(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (err) {
      console.warn("Logout API failed:", err);
    } finally {
      await AsyncStorage.multiRemove(["authToken", "userData"]);
      setUser(null);
      setToken(null);
    }
  };

  /* ---------- CONTEXT VALUE ---------- */
  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ---------------- HOOK ---------------- */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
