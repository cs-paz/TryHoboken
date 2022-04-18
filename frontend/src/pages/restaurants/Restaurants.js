import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = {
  main: {
    flexWrap: "wrap",
    display: "flex",
    alignItems: "stretch",
    margin: "auto",
  },
  listElem: {
    width: "45%",
    padding: "0 10px",
    paddingBottom: "20px",
  },
  textBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "5px 0px 20px 30px",
  },
  title: {
    textAlign: "center",
  },
};

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/restaurants");
    setRestaurants(data);
  }, []);

  return (
    <div style={styles.main}>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id} style={styles.listElem}>
            <Restaurant restaurant={restaurant} />
          </div>
        );
      })}
    </div>
  );
};

const Restaurant = (restaurant) => {
  const link = "/restaurants/" + restaurant.restaurant._id;
  return (
    <div>
      <div style={styles.title}>
        <h1>
          <Link to={link}>{restaurant.restaurant.name}</Link>
        </h1>
      </div>
      <div style={styles.textBox}>
        <p>{restaurant.restaurant.description}</p>
        <p>{restaurant.restaurant.type}</p>
        <p>{restaurant.restaurant.address}</p>
        <p>{restaurant.restaurant.description}</p>
        <a href={restaurant.restaurant.url}>{restaurant.restaurant.url}</a>
      </div>
    </div>
  );
};

export default RestaurantsPage;
