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

const BarsPage = () => {
  const [bars, setBars] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/bars");
    setBars(data);
  }, []);

  return (
    <div style={styles.main}>
      {bars.map((bar) => {
        return (
          <div key={bar._id} style={styles.listElem}>
            <Bar bar={bar} />
          </div>
        );
      })}
    </div>
  );
};

const Bar = (bar) => {
  const link = "/bars/" + bar.bar._id;
  return (
    <div>
      <div style={styles.title}>
        <h1>
          <Link to={link}>{bar.bar.name}</Link>
        </h1>
      </div>
      <div style={styles.textBox}>
        <p>{bar.bar.description}</p>
        <p>{bar.bar.type}</p>
        <p>{bar.bar.address}</p>
        <a href={bar.bar.url}>{bar.bar.url}</a>
      </div>
    </div>
  );
};

export default BarsPage;
