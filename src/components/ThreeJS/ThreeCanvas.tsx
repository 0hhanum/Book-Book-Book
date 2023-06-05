import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { cursorStyleAtom } from "../../atoms";
import { useSetRecoilState } from "recoil";
import { Vector3 } from "three";

interface IThreeCanvas {
  children: any;
  cameraPosition?: Vector3;
}

const ThreeCanvas = ({ children, cameraPosition }: IThreeCanvas) => {
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
        position: cameraPosition || [0, 0, 3],
        focus: 5,
      }}
      dpr={[1, 2]}
    >
      {children}
    </Canvas>
  );
};

export default ThreeCanvas;
