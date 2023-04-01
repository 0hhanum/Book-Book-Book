import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, Color, Float32BufferAttribute, Mesh } from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
}
function BookObject(props: IBookObject) {
  const boxRef = useRef<BoxGeometry>(null);
  const meshRef = useRef<Mesh>(null);
  useEffect(() => {
    if (boxRef.current) {
      const geometry = boxRef.current.toNonIndexed();
      const positionAttribute = geometry.getAttribute("position");
      const colors = [];
      const color = new Color();

      for (let i = 0; i < positionAttribute.count; i += 3) {
        color.set(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
      }
      geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    }
  }, [boxRef]);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh {...props} scale={1} ref={meshRef}>
      <boxGeometry ref={boxRef} args={[0.6, 0.8, 0.15]} />
      <meshNormalMaterial vertexColors={true} />
    </mesh>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 10]} angle={0.15} penumbra={1} />
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
