import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import TodoDetail from "@/pages/todos/[id]";
import { PAGE_PATH } from "./const";
import CheckToken from "./components/Auth/CheckToken";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PAGE_PATH.HOME}
          element={
            <CheckToken>
              <Header />
              <Home />
            </CheckToken>
          }
        >
          <Route
            path={`${PAGE_PATH.TODOS.slice(1)}/:id`}
            element={
              <CheckToken>
                <TodoDetail />
              </CheckToken>
            }
          />
        </Route>
        <Route path={PAGE_PATH.LOGIN} element={<Login />} />
        <Route path={PAGE_PATH.SIGNUP} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
