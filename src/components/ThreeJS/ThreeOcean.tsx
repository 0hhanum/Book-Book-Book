import React, { useRef, useMemo } from "react";
import { extend, useLoader, useFrame, Object3DNode } from "@react-three/fiber";
import { Water } from "three-stdlib";
import { PlaneGeometry, RepeatWrapping, TextureLoader } from "three";

extend({ Water });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: Object3DNode<Water, typeof Water>;
    }
  }
}
const OCEAN_SIZE = 10000;
const OCEAN_TEXTURE_SIZE = 512;
const OCEAN_COLOR = 0x001e0f;

function ThreeOcean() {
  const ref = useRef<Water>(null);
  const waterNormals = useLoader(
    TextureLoader,
    "/threeModel/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE), []);
  const config = useMemo(
    () => ({
      textureWidth: OCEAN_TEXTURE_SIZE,
      textureHeight: OCEAN_TEXTURE_SIZE,
      waterNormals,
      waterColor: OCEAN_COLOR,
      distortionScale: 3,
    }),
    [waterNormals]
  );
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.material.uniforms.time.value += delta;
  });
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

export default ThreeOcean;
