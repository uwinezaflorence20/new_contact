import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import ContactsPage from "./pages/ContactsPage"
import Update from "./pages/Update";
import UserDetail from "./pages/UserDetail"
import Welcome from "./pages/Welcome"
import Footer from "./pages/Footer";

function App() {
  return (
    <div>
      <Welcome/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/sign" element={<SignUpPage />} />
        <Route path="/update/:contactId" element={<Update />} />
        <Route path="/details/:contactId" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;

