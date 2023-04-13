import {
  LinearFilter,
  MeshStandardMaterial,
  RGBAFormat,
  RepeatWrapping,
  TextureLoader,
  UnsignedByteType,
  sRGBEncoding,
} from "three";

interface ILoadTexture {
  bookId: string;
  material: MeshStandardMaterial;
  callback: () => void;
}
export const loadTexture = ({ bookId, material, callback }: ILoadTexture) => {
  const textureLoader = new TextureLoader();
  textureLoader.load(
    "//images.ctfassets.net/drmlgrx4rnh5/6VZzbMODqfXXMYl2Q8CyzZ/b3f303c5c45b3943d0d901f91966040e/test.jpeg",
    (texture) => {
      // to create high quality texture
      texture.generateMipmaps = true;
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
      texture.center.set(0, 0);
      texture.rotation = 0;
      texture.minFilter = LinearFilter;
      texture.needsUpdate = true;
      texture.anisotropy = 1;
      texture.flipY = false;
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.format = RGBAFormat;
      texture.type = UnsignedByteType;
      texture.encoding = sRGBEncoding;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      // change book cover
      material.map = texture;
      callback();
    }
  );
};
