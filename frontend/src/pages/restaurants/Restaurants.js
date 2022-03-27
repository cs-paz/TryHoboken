import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/restaurants");
    setRestaurants(data);
  }, []);

  return (
    <>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <Restaurant restaurant={restaurant} />
          </div>
        );
      })}
    </>
  );
};

const Restaurant = (restaurant) => {
  const link = "/restaurants/" + restaurant.restaurant._id;
  return (
    <div>
      <h1>
        <Link to={link}>{restaurant.restaurant.name}</Link>
      </h1>
      <p>{restaurant.restaurant.description}</p>
      <p>{restaurant.restaurant.type}</p>
      <p>{restaurant.restaurant.address}</p>
      <p>{restaurant.restaurant.description}</p>
      <a href={restaurant.restaurant.url}>{restaurant.restaurant.url}</a>
    </div>
  );
};

export default RestaurantsPage;
