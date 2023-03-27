import * as React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { filteredAuthorAtom } from "../atoms";
import books from "../data/books";

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
  return (
    <div>
      <BookLi>
        {books.map((book) =>
          authorFilter && authorFilter !== book.author ? null : (
            <Book key={book.title}>
              {book.title} - {book.author}
            </Book>
          )
        )}
      </BookLi>
    </div>
  );
};

export default BookList;
