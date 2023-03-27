import React from "react";
import { RecoilRoot } from "recoil";
import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return (
    <RecoilRoot>
      <Layout {...props}>{element}</Layout>
    </RecoilRoot>
  );
};
