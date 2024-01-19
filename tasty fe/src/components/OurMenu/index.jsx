import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

function OurMenu() {
  const [menu, setMenu] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState("main");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/menu/")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <section id="menu">
      <div className="container">
        <h4>OUR MENU</h4>
        <h1>Discover Our Exclusive Menu</h1>
        <div className="category-btn">
          <button onClick={() => setCategoryMenu("main")}>
            <i className="fa-solid fa-drumstick-bite"></i> Main
          </button>
          <button onClick={() => setCategoryMenu("dessert")}>
            <i className="fa-solid fa-ice-cream"></i>Dessert
          </button>
          <button onClick={() => setCategoryMenu("drinks")}>
            <i className="fa-solid fa-champagne-glasses"></i>Drinks
          </button>
        </div>
        <div className="cards">
          {menu
            .filter((item) => item.category === categoryMenu)
            .map((x) => (
              <div
                className="card"
                key={x._id}
                onClick={() => navigate("/detail/" + x._id)}
              >
                <div className="img">
                  <img src={x.image} alt="" />
                </div>
                <div className="text">
                  <h3>{x.name}</h3>
                  <p>{x.ingredients}</p>
                </div>
                <div className="price">
                  <span>${x.price}</span>
                </div>
              </div>
            ))}
        </div>
        <p className="ending">
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost
        </p>
        <Link to="#">Make a Reservation</Link>
      </div>
    </section>
  );
}

export default OurMenu;
