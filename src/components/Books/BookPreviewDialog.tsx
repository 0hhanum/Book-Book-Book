import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
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
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;
const Dialog = styled.dialog`
  padding: 0;
  width: 80vw;
  height: 95vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  border: ${(props) => `0.5px solid ${props.theme.normalColor}`};
`;
const Stars = styled.div`
  display: flex;
  margin-left: 10px;
`;
const Star = styled.img.attrs((props) => ({
  src: props.theme.assets.starIcon,
}))`
  height: 30px;
  width: 30px;
  align-self: center;
`;

const BookPreviewDialog = (book: IBook) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const setSelectedBook = useSetRecoilState(selectedBookAtom);
  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedBook(null);
  };
  return (
    <Dimmed onClick={closeDialog}>
      <Dialog open ref={dialogRef} onClick={(e) => e.stopPropagation()}>
        <Header>
          <span>
            {book.title} - {book.author}
          </span>
          <Stars>
            {Array(book.rating)
              .fill(null)
              .map((_, i) => (
                <Star />
              ))}
          </Stars>
        </Header>
      </Dialog>
    </Dimmed>
  );
};

export default BookPreviewDialog;
