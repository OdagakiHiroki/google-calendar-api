import { BrowserRouter, Routes, Route } from "react-router-dom";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BeforeRenderElement } from "BeforeRenderElement";
import { Top } from "components/pages/Top";
import { Login } from "components/pages/Login";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

export const App = () => {
  return (
    <>
      <GlobalStyle />
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
        </Routes>
      </BrowserRouter>
    </>
  );
};
