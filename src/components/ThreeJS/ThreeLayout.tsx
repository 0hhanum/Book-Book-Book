import React, { Suspense, lazy } from "react";

interface IThreeLayout {
  children: any;
}
const ThreeCanvas = lazy(() => import("./ThreeCanvas"));
const ThreeLayout = ({ children }: IThreeLayout) => {
  return (
    <Suspense fallback={null}>
      <ThreeCanvas>{children}</ThreeCanvas>
    </Suspense>
  );
};

export default ThreeLayout;
