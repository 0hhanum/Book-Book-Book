import React from "react";
import { RecoilRoot } from "recoil";
export const wrapPageElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
