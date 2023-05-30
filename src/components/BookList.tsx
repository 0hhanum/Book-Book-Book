import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  filteredAuthorAtom,
  progressDialogAtom,
  selectedBookAtom,
} from "../atoms";
import { IBook } from "../types/book";
import BookPreviewDialog from "./Books/BookPreviewDialog";
import { graphql, useStaticQuery } from "gatsby";

const Books = styled.ul`
  cursor: pointer;
`;
const Book = styled.a`
  display: block;
  height: 45px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  padding-top: 20px;
  border-bottom: ${(props) => `1px solid ${props.theme.normalColor}`};
`;

function preloadBookTextures(books: IBook[], onTextureLoaded: () => void) {
  let loadedTextureCount = 0;
  books.forEach((book) => {
    const imgSrc = book.coverImage?.file?.url || "";
    const virtualImage = new Image();
    virtualImage.src = imgSrc; // it makes load texture concurrently using disc cache
    virtualImage.onload = () => {
      loadedTextureCount++;
      if (loadedTextureCount === books.length) {
        onTextureLoaded(); // hide progress bar
      }
    };
  });
}

const BookList = () => {
  const {
    allContentfulBooks: { nodes: books },
  } = useStaticQuery<Queries.getBooksQuery>(graphql`
    query getBooks {
      allContentfulBooks {
        nodes {
          id
          author
          title
          rating
          coverImage {
            file {
              url
            }
          }
        }
      }
    }
  `);
  const authorFilter = useRecoilValue(filteredAuthorAtom);
  const [selectedBook, setSelectedBook] = useRecoilState(selectedBookAtom);
  const setIsShowProgressDialog = useSetRecoilState(progressDialogAtom);

  useEffect(() => {
    setIsShowProgressDialog("dot");
    const hideProgressDialog = () => {
      setIsShowProgressDialog(null);
    };
    preloadBookTextures(books as IBook[], hideProgressDialog);
  }, []);
  const openBookPreview = (book: IBook) => {
    setSelectedBook(book);
  };
  return (
    <div>
      <Books>
        {books.map((book: IBook) =>
          authorFilter && authorFilter !== book.author ? null : (
            <li key={book.title}>
              <Book onClick={() => openBookPreview(book)}>
                {book.title} - {book.author}
              </Book>
            </li>
          )
        )}
      </Books>
      {selectedBook ? <BookPreviewDialog {...selectedBook} /> : null}
    </div>
  );
};

export default BookList;
