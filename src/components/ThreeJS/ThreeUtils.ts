import {
  LinearFilter,
  MeshStandardMaterial,
  RGBAFormat,
  RepeatWrapping,
  TextureLoader,
  UnsignedByteType,
  sRGBEncoding,
} from "three";
import { IBookCover } from "../../types/book";

export const loadTexture = ({
  bookCoverSrc,
  material,
  callback,
}: IBookCover) => {
  const textureLoader = new TextureLoader();
  return new Promise((resolve, reject) => {
    textureLoader.load(
      bookCoverSrc,
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
        resolve(null);
      },
      undefined,
      (error) => {
        console.log(error);
        callback();
        reject(error);
      }
    );
  });
};

export const convertToKebabCase = (str: string): string => {
  return str.toLowerCase().replaceAll(/[\s_]+/g, "-");
};
