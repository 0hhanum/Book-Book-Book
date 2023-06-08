import React, { useEffect } from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import BookList from "../components/BookList";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSetRecoilState } from "recoil";
import { progressDialogAtom } from "../atoms";

const Container = styled.div`
  padding-left: ${(props) => `${props.theme.variables.sidebarWidth}px`};
`;
const Home = () => {
  const setIsShowProgressDialog = useSetRecoilState(progressDialogAtom);
  useEffect(() => {
    // for preload book texture
    setIsShowProgressDialog("dot");
  }, []);

  return (
    <>
      <Sidebar />
      <Container>
        <BookList />
      </Container>
    </>
  );
};

export default Home;
export const Head = () => <Helmet />;
