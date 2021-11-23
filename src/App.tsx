import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BeforeRenderElement } from "BeforeRenderElement";
import { Top } from "components/pages/Top";
import { Login } from "components/pages/Login";
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<BeforeRenderElement path="/login" element={<Login />}/>} />
        <Route path="/" element={<BeforeRenderElement path="/" element={<Top />} requiresAuth={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
