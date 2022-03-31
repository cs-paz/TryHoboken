import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const IndividualBar = () => {
  const [barData, setBarData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function getRestaurantData() {
      let url = "http://localhost:3001/bars/" + id;
      const { data } = await axios.get(url);
      setBarData(data);
    }
    getRestaurantData();
  }, []);

  console.log(barData);

  const displayData = barData && (
    <div>
      <h1>{barData.name}</h1>
      <p>{barData.type}</p>
      <p>{barData.address}</p>
      <p>{barData.description}</p>
      <a href={barData.url} target="_blank">
        {barData.url}
      </a>
    </div>
  );

  return (
    <div>
      <Link to={"/bars"}>Back to all bars</Link>
      {displayData}
    </div>
  );
};

export default IndividualBar;
