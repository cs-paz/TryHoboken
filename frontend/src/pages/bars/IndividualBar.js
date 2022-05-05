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
    <div class="card text-center justify-content-center">
      <div class="card-header">
        <h1>{barData.name}</h1>
      </div>
      <div class="card-body">
        <img src={barData.image} height={150} style={{ marginBottom: 10 }} />
        <p>{barData.type}</p>
        <p>{barData.address}</p>
        <p>{barData.description}</p>
        <a href={barData.url} target="_blank" rel="noreferrer">
          {barData.url}
        </a>
      </div>
      <div class="card-footer text-center justify-content-center">
        <AddComment id={id} barData type={"bars"} />
      </div>
      <CommentsSection comments={barData.comments} />
    </div>
  );

  return <div>{displayData}</div>;
};

export default IndividualBar;
