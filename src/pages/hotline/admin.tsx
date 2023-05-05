import React, { useEffect, useRef } from "react";
import { Peer } from "peerjs";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  padding: 5px;
`;
const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const Admin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const connect = () => {
    console.log(inputRef.current?.value);
  };
  return (
    <div>
      <Input ref={inputRef} placeholder="peer id" />
      <Button onClick={connect}>Connect</Button>
    </div>
  );
};

export default Admin;
