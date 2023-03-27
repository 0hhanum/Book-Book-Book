import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <>
      <h1>404</h1>
    </>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
