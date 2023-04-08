import React, { lazy, Suspense } from "react";
import ThreeBookScene from "../components/ThreeJS/ThreeBookScene";
import { IBook } from "../data/books";
import { toPascalCase } from "./coverUtils";

const BookCoverLayout = (book: IBook) => {
  const BookPreview = lazy(() =>
    import(`./${toPascalCase(book.title)}`).catch(() => {
      return {
        default: () => <strong>Something goes wrong</strong>,
      };
    })
  );
  return (
    <Suspense fallback={<h1>Loading Book Covers...</h1>}>
      {/* <BookPreview /> */}
      <ThreeBookScene />
    </Suspense>
  );
};

export default BookCoverLayout;
