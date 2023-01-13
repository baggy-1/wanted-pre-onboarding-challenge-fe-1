import { PAGE_PATH } from "@/constants";
import { getAuthToken } from "@/utils";
import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  isValid: boolean;
  login: (callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [isValid, setIsValid] = useState(!!getAuthToken());

  const login = (callback: VoidFunction) => {
    setIsValid(true);
    callback();
  };

  const logout = (callback: VoidFunction) => {
    setIsValid(false);
    callback();
  };

  return (
    <AuthContext.Provider value={{ isValid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("404, AuthProvider not found");
  }
  return auth;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isValid } = useAuth();
  const location = useLocation();

  if (!isValid) {
    return (
      <>
        <Navigate to={PAGE_PATH.LOGIN} state={{ from: location }} replace />
      </>
    );
  }

  return children;
};

const RequireUnAuth = ({ children }: { children: JSX.Element }) => {
  const { isValid } = useAuth();
  const location = useLocation();

  if (isValid) {
    return (
      <>
        <Navigate to={PAGE_PATH.HOME} state={{ from: location }} replace />
      </>
    );
  }

  return children;
};

export const withAuth = (Component: JSX.Element) => {
  return <RequireAuth>{Component}</RequireAuth>;
};

export const withUnAuth = (Component: JSX.Element) => {
  return <RequireUnAuth>{Component}</RequireUnAuth>;
};
