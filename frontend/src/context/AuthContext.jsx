import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("meditrack_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (authData) => {
    // authData = { token, name, email, role }
    localStorage.setItem("meditrack_user", JSON.stringify(authData));
    localStorage.setItem("meditrack_token", authData.token);
    setUser(authData);
  };

  const logout = () => {
    localStorage.removeItem("meditrack_user");
    localStorage.removeItem("meditrack_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}