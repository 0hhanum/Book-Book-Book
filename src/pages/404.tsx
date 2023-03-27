import React from "react";
import Helmet from "../components/Helmet";

const NotFoundPage = () => {
  return (
    <>
      <h1>404</h1>
    </>
  );
};

export default NotFoundPage;

export const Head = () => <Helmet title="404" />;
