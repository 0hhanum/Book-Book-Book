import * as React from "react";
import styled from "styled-components";
import books from "../data/books";

const Container = styled.div``;
const BookList = styled.ul`
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
const Books = () => {
  return (
    <Container>
      <BookList>
        {books.map((book) => (
          <Book key={book.title}>
            {book.title} - {book.author}
          </Book>
        ))}
      </BookList>
    </Container>
  );
};

export default Books;
