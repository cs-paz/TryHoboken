import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../CommentsSection";
import AddComment from "../AddComment";

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
  }, [id]);

  const displayData = restaurantData && (
    <div>
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.type}</p>
      <p>{restaurantData.address}</p>
      <p>{restaurantData.description}</p>
      <a href={restaurantData.url} target="_blank" rel="noreferrer">
        {restaurantData.url}
      </a>
      <AddComment id={id} type="restaurants" />
      <CommentsSection comments={restaurantData.comments} />
    </div>
  );

  return <div>{displayData}</div>;
};

export default IndividualRestaurant;
