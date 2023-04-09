import React from "react";
import ThreeBookScene from "../components/ThreeJS/ThreeBookScene";
import { IBook } from "../data/books";

const BookCoverLayout = (book: IBook) => {
  return <ThreeBookScene book={book} />;
};

export default BookCoverLayout;
