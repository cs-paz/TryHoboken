import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../CommentsSection";
import AddComment from "../AddComment";

const IndividualBar = () => {
  const [barData, setBarData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function getBarData() {
      let url = "http://localhost:3001/bars/" + id;
      const { data } = await axios.get(url);
      setBarData(data);
    }
    getBarData();
  }, [id]);

  const displayData = barData && (
    <div>
      <h1>{barData.name}</h1>
      <p>{barData.type}</p>
      <p>{barData.address}</p>
      <p>{barData.description}</p>
      <a href={barData.url} target="_blank" rel="noreferrer">
        {barData.url}
      </a>
      <AddComment id={id} barData type={"bars"} />
      <CommentsSection comments={barData.comments} />
    </div>
  );

  return <div>{displayData}</div>;
};

export default IndividualBar;
