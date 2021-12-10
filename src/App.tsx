import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BeforeRenderElement } from "BeforeRenderElement";
import { Top } from "components/pages/Top";
import { Mobi } from "components/pages/Mobi";
import { Login } from "components/pages/Login";
import './App.css';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<BeforeRenderElement path="/login" element={<Login />} />}
          />
          <Route
            path="/"
            element={
              <BeforeRenderElement
                path="/"
                element={<Top />}
                requiresAuth={true}
              />
            }
          />
          <Route
            path="/mobi"
            element={
              <BeforeRenderElement
                path="/mobi"
                element={<Mobi />}
                requiresAuth={true}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
