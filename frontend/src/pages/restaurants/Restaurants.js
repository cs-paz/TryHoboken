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
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/restaurants");
    setRestaurants(data);
  }, []);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/restaurants/types");
    let option = ["All"];
    option = option.concat(data);
    setOptions(option);
  }, []);

  const getRestaurantsByOption = async (type) => {
    if (type == "All") {
      const { data } = await axios.get("http://localhost:3001/restaurants");
      return data;
    }
    const { data } = await axios.post(
      `http://localhost:3001/restaurants/type/${type}`
    );
    return data;
  };

  return (
    <div className="card">
      <div>
        <label className="form-select">
          <select id="filterByType">
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </label>
        <button
          className="btn btn-secondary"
          onClick={async (e) => {
            e.preventDefault();
            const select = document.getElementById("filterByType");
            let val = select.value;
            let rests = await getRestaurantsByOption(val);
            setRestaurants(rests);
          }}
        >
          Filter
        </button>
      </div>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id}>
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
    <div className="card text-center justify-content-center">
      <div className="card-header">
        <h1>
          <Link to={link}>{restaurant.restaurant.name}</Link>
        </h1>
      </div>
      <div className="card-body">
        <img
          src={restaurant.restaurant.image}
          height={150}
          style={{ marginBottom: 10 }}
        />
        <p>{restaurant.restaurant.type}</p>
        <p>{restaurant.restaurant.address}</p>
        <a href={restaurant.restaurant.url} target="_blank" rel="noreferrer">
          {restaurant.restaurant.url}
        </a>
      </div>
    </div>
  );
};

export default RestaurantsPage;
