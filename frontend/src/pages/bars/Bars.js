import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BarsPage = () => {
  const [bars, setBars] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/bars");
    setBars(data);
  }, []);

  return (
    <>
      {bars.map((bar) => {
        return (
          <div key={bar._id}>
            <Bar bar={bar} />
          </div>
        );
      })}
    </>
  );
};

const Bar = (bar) => {
  const link = "/bars/" + bar.bar._id;
  return (
    <div>
      <h1>
        <Link to={link}>{bar.bar.name}</Link>
      </h1>
      <p>{bar.bar.description}</p>
      <p>{bar.bar.type}</p>
      <p>{bar.bar.address}</p>
      <p>{bar.bar.description}</p>
      <a href={bar.bar.url}>{bar.bar.url}</a>
    </div>
  );
};

export default BarsPage;
