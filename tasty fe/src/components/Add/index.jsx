import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
function Add() {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState([]);
  const [sortedProperty, setSortedProperty] = useState(null);
  function getAll() {
    fetch("http://localhost:3000/menu/")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }
  useEffect(() => {
    getAll();
  }, []);
  async function handleSubmit(values) {
    await fetch("http://localhost:3000/menu/", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    getAll();
  }
  async function deleteItem(id) {
    await fetch("http://localhost:3000/menu/" + id, {
      method: "DELETE",
    });
    getAll();
  }
  function checkType(value) {
    if (typeof value === "string") {
      return value.toLowerCase();
    } else {
      return value;
    }
  }
  return (
    <section id="add">
      <div className="container">
        <Formik
          initialValues={{
            name: "",
            image: "",
            category: "",
            ingredients: "",
            price: 0,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, "Must be 5 characters or more")
              .required("Required"),
            image: Yup.string()
              .min(5, "Must be 5 characters or more")
              .required("Required"),
            category: Yup.string()
              .min(5, "Must be 5 characters or more")
              .required("Required"),
            ingredients: Yup.string()
              .min(15, "Must be 15 characters or more")
              .required("Required"),
            price: Yup.number().positive().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <div className="form">
              <label htmlFor="name">Name :</label>
              <Field name="name" type="text" placeholder="Enter Name"/>
              <ErrorMessage name="name" component={"span"} />
            </div>

            <div className="form">
              <label htmlFor="image">Image :</label>
              <Field name="image" type="text" placeholder="Enter image URL"/>
              <ErrorMessage name="image" component={"span"} />
            </div>

            <div className="form">
              <label htmlFor="category">Category :</label>
              <Field name="category" type="text" placeholder="Enter Category"/>
              <ErrorMessage name="category" component={"span"} />
            </div>

            <div className="form">
              <label htmlFor="ingredients">Ingredients :</label>
              <Field name="ingredients" type="text" placeholder="Enter Ingredients"/>
              <ErrorMessage name="ingredients" component={"span"} />
            </div>

            <div className="form">
              <label htmlFor="price">Price :</label>
              <Field name="price" type="number" placeholder="Enter Price"/>
              <ErrorMessage name="price" component={"span"} />
            </div>

            <button type="submit">Add</button>
          </Form>
        </Formik>
        <div className="table">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="sort-btns">
            <button onClick={() => setSortedProperty(null)}>Default</button>
            <button
              onClick={() => setSortedProperty({ property: "name", asc: true })}
            >
              Name(A-Z)
            </button>
            <button
              onClick={() =>
                setSortedProperty({ property: "name", asc: false })
              }
            >
              Name(Z-A)
            </button>
            <button
              onClick={() =>
                setSortedProperty({ property: "price", asc: true })
              }
            >
              Price(Low-High)
            </button>
            <button
              onClick={() =>
                setSortedProperty({ property: "price", asc: false })
              }
            >
              Price(High-Low)
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Category</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu
                .filter((x) =>
                  x.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => {
                  if (sortedProperty && sortedProperty.asc) {
                    return checkType(a[sortedProperty.property]) >
                      checkType(b[sortedProperty.property])
                      ? 1
                      : checkType(b[sortedProperty.property]) >
                        checkType(a[sortedProperty.property])
                      ? -1
                      : 0;
                  } else if (sortedProperty && sortedProperty.asc === false) {
                    return checkType(a[sortedProperty.property]) <
                      checkType(b[sortedProperty.property])
                      ? 1
                      : checkType(b[sortedProperty.property]) <
                        checkType(a[sortedProperty.property])
                      ? -1
                      : 0;
                  } else {
                    return 0;
                  }
                })
                .map((x) => (
                  <tr key={x._id}>
                    <td>
                      <img src={x.image} alt="" width={"200px"} />
                    </td>
                    <td>{x.name}</td>
                    <td>{x.ingredients}</td>
                    <td>{x.category}</td>
                    <td>{x.price}</td>
                    <td>
                      <i
                        className="fa-regular fa-trash-can"
                        onClick={() => deleteItem(x._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Add;
