import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedBookAtom } from "../../atoms";
import { IBook } from "../../data/books";

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = styled.header`
  height: 45px;
  border-bottom: ${(props) => `0.5px solid ${props.theme.normalColor}`};
  width: 100%;
`;
const Dialog = styled.dialog`
  padding: 0;
  width: 70vw;
  height: 75vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  border: ${(props) => `0.5px solid ${props.theme.normalColor}`};
`;
const BookPreview = (book: IBook) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedBook, setSelectedBook] = useRecoilState(selectedBookAtom);
  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedBook(null);
  };
  return (
    <Dimmed onClick={closeDialog}>
      <Dialog open ref={dialogRef}>
        <Header>{book.title}</Header>
      </Dialog>
    </Dimmed>
  );
};

export default BookPreview;
