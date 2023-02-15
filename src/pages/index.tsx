import * as React from "react";
import type { PageProps } from "gatsby";
import Helmet from "../components/Helmet";

const IndexPage: React.FC<PageProps> = () => {
  return <main> HELLO </main>;
};

export default IndexPage;

export const Head = () => <Helmet />;
