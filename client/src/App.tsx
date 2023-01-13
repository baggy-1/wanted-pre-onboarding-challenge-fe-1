import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PAGE_PATH } from "@/constants";
import HomePage from "@/pages/home";
import TodoDetailPage from "@/pages/todos/[id]";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import Layout from "@/components/common/Layout";
import { AuthProvider, withAuth, withUnAuth } from "@/providers/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={PAGE_PATH.HOME} element={withAuth(<HomePage />)}>
              <Route
                path={`${PAGE_PATH.TODOS}/:id`}
                element={withAuth(<TodoDetailPage />)}
              />
            </Route>
          </Route>
          <Route path={PAGE_PATH.LOGIN} element={withUnAuth(<LoginPage />)} />
          <Route path={PAGE_PATH.SIGNUP} element={withUnAuth(<SignupPage />)} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
