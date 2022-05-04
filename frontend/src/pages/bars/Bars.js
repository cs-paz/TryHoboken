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
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/bars");
    setBars(data);
  }, []);

  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3001/bars/types");
    let option = ["All"];
    option = option.concat(data);
    setOptions(option);
  }, []);

  const getBarsByOption = async (type) => {
    if (type == "All") {
      const { data } = await axios.get("http://localhost:3001/bars");
      return data;
    }
    const { data } = await axios.post(
      `http://localhost:3001/bars/type/${type}`
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
            let typeBars = await getBarsByOption(val);
            setBars(typeBars);
          }}
        >
          Filter
        </button>
      </div>
      {bars.map((bar) => {
        return (
          <div key={bar._id}>
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
    <div className="card text-center justify-content-center">
      <div className="card-header">
        <h1>
          <Link to={link}>{bar.bar.name}</Link>
        </h1>
      </div>
      <div className="card-body">
        <p>{bar.bar.type}</p>
        <p>{bar.bar.address}</p>
        <a href={bar.bar.url} target="_blank" rel="noreferrer">
          {bar.bar.url}
        </a>
      </div>
    </div>
  );
};

export default BarsPage;
