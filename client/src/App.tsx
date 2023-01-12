import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PAGE_PATH } from "./const";
import CheckToken from "./components/Auth/CheckToken";
import Header from "./components/Layout/Header";
import HomePage from "@/pages/home";
import TodosPage from "@/pages/todos/[id]";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PAGE_PATH.HOME}
          element={
            <CheckToken>
              <Header />
              <HomePage />
            </CheckToken>
          }
        >
          <Route
            path={`${PAGE_PATH.TODOS.slice(1)}/:id`}
            element={
              <CheckToken>
                <TodosPage />
              </CheckToken>
            }
          />
        </Route>
        <Route path={PAGE_PATH.LOGIN} element={<LoginPage />} />
        <Route path={PAGE_PATH.SIGNUP} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
