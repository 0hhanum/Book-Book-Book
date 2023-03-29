import React, { lazy, Suspense } from "react";
import { IBook } from "../data/books";
import { toPascalCase } from "./coverutil";

const BookCoverLayout = (book: IBook) => {
  const BookPreview = lazy(() =>
    import(`./${toPascalCase(book.title)}`).catch((error) => {
      return {
        default: () => <strong>Something goes wrong</strong>,
      };
    })
  );
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BookPreview />
      </Suspense>
    </div>
  );
};

export default BookCoverLayout;
