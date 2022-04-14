import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Restaurants from "./pages/restaurants/Restaurants";
import Bars from "./pages/bars/Bars";
import IndividualRestaurant from "./pages/restaurants/IndividualRestaurant";
import IndividualBar from "./pages/bars/IndividualBar";
import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>|<Link to="/restaurants">Restaurants</Link>|
        <Link to="/bars">Bars</Link>
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
