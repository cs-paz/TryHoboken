import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Restaurants from "./pages/restaurants/Restaurants";
import Bars from "./pages/bars/Bars";
import IndividualRestaurant from "./pages/restaurants/IndividualRestaurant";
import IndividualBar from "./pages/bars/IndividualBar";
import "./App.css";

const styles = {
  main: {
    margin: "auto",
    width: "80%",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "20px 30px",
  },
};

function App() {
  return (
    <div class="container pt-1">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="navbar-header">
            <a class="navbar-brand">Try Hoboken</a>
          </div>
            <ul class="nav navbar-nav">
              <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
              <li ckass="nav-item"><a class="nav-link" href="/restaurants">Restaurants</a></li>
              <li class="nav-item"><a class="nav-link" href="/bars">Bars</a></li>
            </ul>
    
      </nav>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurants/:id" element={<IndividualRestaurant />} />
      <Route path="/bars" element={<Bars />} />
      <Route path="/bars/:id" element={<IndividualBar />} />
    </Routes>
      </div>
      
    
  );
}

export default App;
