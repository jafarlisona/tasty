import React from "react";
import OurMenu from "../../components/OurMenu";
import { Helmet } from "react-helmet-async";
function Home() {
  return (
    <>
      <Helmet>
        <title>Tasty Home Page</title>
      </Helmet>
      <OurMenu />
    </>
  );
}

export default Home;
