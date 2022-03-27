import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const IndividualRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function getRestaurantData() {
      let url = "http://localhost:3001/restaurants/" + id;
      const { data } = await axios.get(url);
      setRestaurantData(data);
    }
    getRestaurantData();
  }, []);

  const displayData = restaurantData && (
    <div>
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.type}</p>
      <p>{restaurantData.address}</p>
      <p>{restaurantData.description}</p>
      <a href={restaurantData.url} target="_blank">
        {restaurantData.url}
      </a>
    </div>
  );

  return (
    <div>
      <Link to={"/restaurants"}>Back to all restaurants</Link>
      {displayData}
    </div>
  );
};

export default IndividualRestaurant;