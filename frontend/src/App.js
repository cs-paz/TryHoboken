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
    <div style={styles.main}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/restaurants">Restaurants</a></li>
        <li><a href="/bars">Bars</a></li>
      </ul>
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
