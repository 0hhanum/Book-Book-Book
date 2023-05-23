import React from "react";
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
import { checkImageCached } from "./utils";

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
  const openBookPreview = (book: IBook) => {
    const imgSrc = book.coverImage?.file?.url || "";
    if (typeof window !== "undefined") {
      if (!checkImageCached(`http:${imgSrc}`)) {
        setIsShowProgressDialog("dot");
      }
    }
    const img = document.createElement("img");
    img.src = imgSrc; // it makes load texture concurrently using disc cache
    setSelectedBook(book);
    img.onload = () => setIsShowProgressDialog(null);
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
