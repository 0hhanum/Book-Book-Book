import React, { lazy, Suspense } from "react";
import ThreeLayout from "../components/ThreeJS/ThreeLayout";
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
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BookPreview />
        <ThreeLayout>1223</ThreeLayout>
      </Suspense>
    </div>
  );
};

export default BookCoverLayout;
