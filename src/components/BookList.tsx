import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { filteredAuthorAtom, selectedBookAtom } from "../atoms";
import books, { IBook } from "../data/books";
import BookPreview from "./Books/BookPreview";

const BookLi = styled.ul`
  cursor: pointer;
`;
const Book = styled.li`
  height: 45px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  padding-top: 20px;
  border-bottom: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const BookList = () => {
  const authorFilter = useRecoilValue(filteredAuthorAtom);
  const [selectedBook, setSelectedBook] = useRecoilState(selectedBookAtom);
  const openBookPreview = (book: IBook) => {
    setSelectedBook((current) => (current?.id === book.id ? null : book));
  };
  return (
    <div>
      <BookLi>
        {books.map((book) =>
          authorFilter && authorFilter !== book.author ? null : (
            <Book key={book.title} onClick={() => openBookPreview(book)}>
              {book.title} - {book.author}
            </Book>
          )
        )}
      </BookLi>
      {selectedBook ? <BookPreview {...selectedBook} /> : null}
    </div>
  );
};

export default BookList;
