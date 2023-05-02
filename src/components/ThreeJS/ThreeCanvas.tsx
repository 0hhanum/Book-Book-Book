import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { cursorStyleAtom } from "../../atoms";
import { useSetRecoilState } from "recoil";

interface IThreeCanvas {
  children: any;
}

const ThreeCanvas = ({ children }: IThreeCanvas) => {
  const setIsHover = useSetRecoilState(cursorStyleAtom);
  // clear pointer cursor when unmounted
  useEffect(() => {
    return () => {
      setIsHover(false);
    };
  }, []);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{
        position: [0, 0, 3],
        focus: 5,
      }}
      dpr={[1, 2]}
    >
      {children}
    </Canvas>
  );
};

export default ThreeCanvas;
