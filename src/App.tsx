import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import CheckToken from "@/pages/auth/components/CheckToken";
import TodoDetail from "@/pages/todos/[id]";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckToken>
              <Header />
              <Home />
            </CheckToken>
          }
        >
          <Route
            path="todos/:id"
            element={
              <CheckToken>
                <TodoDetail />
              </CheckToken>
            }
          />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
