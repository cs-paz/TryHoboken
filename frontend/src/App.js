import axios from "axios";
import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Restaurants from "./pages/restaurants/Restaurants";
import Bars from "./pages/bars/Bars";

function App() {
  // useEffect(async () => {
  //   const { data } = await axios.get("http://localhost:3001/test");
  //   if (data.test === "success") {
  //     setSuccess(true);
  //   }
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/bars" element={<Bars />} />
      </Routes>
    </div>
  );
}

export default App;
