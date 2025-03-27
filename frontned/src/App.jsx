import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PostPropertyForm from "./pages/postProperty";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/postproperty" element={<PostPropertyForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
