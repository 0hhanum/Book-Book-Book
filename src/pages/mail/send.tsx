import React, { useRef } from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { sendMail } from "../../apis/mailApi";
import { useSetRecoilState } from "recoil";
import { progressDialogAtom } from "../../atoms";
import { navigate } from "gatsby";

interface ILabel {
  htmlFor: string;
}
const Container = styled.div`
  width: 100%;
`;
const ContentLayout = styled.div`
  display: flex;
  width: 100%;
`;
const ContentSection = styled.section`
  width: 50%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  &:first-child {
    border-right: ${(props) => `1px solid ${props.theme.normalColor}`};
    display: flex;
    align-items: center;
    h1 {
      font-size: 128px;
      margin-bottom: 24px;
    }
  }
  &:last-child {
    h1 {
      font-size: 64px;
      letter-spacing: 12px;
    }
  }
`;
const FormContainer = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.normalColor}`};
  height: calc(100% - 128px);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const FormButton = styled.button`
  background-color: transparent;
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  height: 64px;
  font-size: 24px;
`;
const Subject = styled.input`
  outline: none;
  border: none;
  font-size: 24px;
  height: 48px;
  border-radius: 40px;
  background-color: transparent;
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  color: ${(props) => props.theme.fontColor};
  padding: 0 20px;
`;
const Label = styled.label.attrs(({ htmlFor }: ILabel) => ({
  htmlFor,
}))`
  font-size: 36px;
  margin-bottom: 10px;
`;

const Message = styled.textarea.attrs({
  placeholder: "Please leave your contact.",
})`
  outline: none;
  border: none;
  font-size: 24px;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  resize: none;
  flex-grow: 1;
  border-radius: 40px;
  padding: 20px;
  &:focus {
    border: ${(props) => `1px solid ${props.theme.headerColor}`};
  }
`;

const SendMail = () => {
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const setIsShowProgressDialog = useSetRecoilState(progressDialogAtom);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsShowProgressDialog("dot");
    event.preventDefault();
    const subject = subjectRef.current?.value;
    const message = messageRef.current?.value;
    if (!subject && !message) return;
    sendMail({ subject, message })
      .then((response) => {
        if (response.ok) {
          navigate("/mail/success");
        } else {
          throw Error("something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error sending mail:", error);
        navigate("/");
      })
      .finally(() => {
        setIsShowProgressDialog(null);
      });
  };
  return (
    <Container>
      <ContentLayout>
        <ContentSection>
          <h1>Get in touch</h1>
        </ContentSection>
        <ContentSection>
          <h1>rntls123@</h1>
          <h1>naver.com</h1>
          <FormContainer>
            <Form onSubmit={onSubmit}>
              <FormButton>Send</FormButton>
              <Label htmlFor="mail-subject">Subject</Label>
              <Subject
                id="mail-subject"
                autoComplete="off"
                name="subject"
                ref={subjectRef}
              />
              <Label htmlFor="mail-message">Message</Label>
              <Message id="mail-message" name="message" ref={messageRef} />
            </Form>
          </FormContainer>
        </ContentSection>
      </ContentLayout>
    </Container>
  );
};

export default SendMail;
export const Head = () => <Helmet title="Mail" />;
