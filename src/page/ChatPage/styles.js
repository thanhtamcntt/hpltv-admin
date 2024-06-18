import styled from 'styled-components';

export const DivContainerChat = styled.div`
  margin: 30px;
  text-align: left;
  color: var(--white);
`;

export const DivContent = styled.div`
  width: 350px;
  border: 1px solid #000;
`;

export const DivListChat = styled.div``;

export const DivJoinRoom = styled.div`
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  color: var(--black);
`;

export const ButtonJoinChat = styled.button``;

export const DivChat = styled.div`
  background-color: var(--bg-chat);
  border-radius: 10px;
  & p {
    margin-bottom: 1rem;
  }
  & button {
    color: var(--white-bg);
    width: 100%;
    background: rgb(15 155 0);
    padding: 0.7rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s linear;
    & span {
      margin-left: 10px;
    }

    &:hover {
      background: rgb(17, 135, 4);
    }
  }
`;

export const ButtonFooter = styled.button`
  width: 50%;
  background: transparent;
  color: ${(props) => (!props.handle ? '#7f7f7f' : 'var(--white-bg)')};
  cursor: pointer;
  & p {
    margin-top: 4px;
  }
  & svg {
    color: ${(props) => (!props.handle ? '#7f7f7f' : 'var(--white-bg)')};
  }

  &:hover {
    color: var(--white-bg);
    & svg {
      color: var(--white-bg);
    }
  }
`;

export const DivForm = styled.div`
  & label {
    color: var(--white-bg) !important;
  }

  & button {
    margin-top: 24px;
  }

  & input {
    padding: 8px 10px;
  }

  & .ant-form-item {
    margin-bottom: 1rem !important;
  }
`;

export const DivContentChat = styled.div`
  background: var(--white-bg);
  height: 100%;
`;

export const TitleChat = styled.h3`
  background: #212b30;
  padding: 2px 0;
`;

export const ChatContent = styled.div`
  min-height: 400px;
`;

export const FormChat = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--black);

  & input {
    width: 80%;
    padding: 12px 10px;
  }
`;

export const ButtonChat = styled.button`
  flex: 1;
  padding: 13px 0;
  outline: none;
  border: none;
  background-color: transparent;
  border-left: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & svg {
    color: var(--black);
  }
`;
