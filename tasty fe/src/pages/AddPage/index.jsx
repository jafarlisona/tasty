import React from "react";
import { Helmet } from "react-helmet-async";
import Add from "../../components/Add";

function AddPage() {
  return (
    <>
      <Helmet>
        <title>Tasty Add Page</title>
      </Helmet>
      <Add />
    </>
  );
}

export default AddPage;
