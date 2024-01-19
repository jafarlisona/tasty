import React from "react";
import { Helmet } from "react-helmet-async";
import Detail from "../../components/Detail";

function DetailPage() {
  return (
    <>
      <Helmet>
        <title>Tasty Detail Page</title>
      </Helmet>
      <Detail />
    </>
  );
}

export default DetailPage;
