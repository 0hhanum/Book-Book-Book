import React from "react";
import ThreeBookScene from "../../ThreeJS/ThreeBookScene";
import { IBook } from "../../../types/book";

const BookCoverLayout = (book: IBook) => {
  return <ThreeBookScene book={book} />;
};

export default BookCoverLayout;
