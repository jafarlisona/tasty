import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu/" + id)
      .then((res) => res.json())
      .then((data) => setMenuItem(data));
  }, []);
  return (
    <section id="detail">
      <div className="container">
        <div className="img">
          <img src={menuItem.image} alt="" />
        </div>
        <div className="content">
          <h1>{menuItem.name}</h1>
          <p>
            Ingredients :<span>{menuItem.ingredients}</span>
          </p>
          <p>
            Category : <span>{menuItem.category}</span>
          </p>
          <p>
            Price : <span>${menuItem.price}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Detail;
