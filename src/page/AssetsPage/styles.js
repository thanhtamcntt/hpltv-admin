import styled from 'styled-components';

export const DivAssets = styled.div`
  margin: 30px 0;
  text-align: left;
`;

export const DivAddData = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
`;

export const DivAction = styled.div`
  display: flex;

  & button {
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 18px 36px;
    font-weight: 500;
  }

  & button:nth-child(2) {
    margin-left: 20px;
  }
`;

export const DivImport = styled.button`
  margin-left: 10px;
  background: green;
  color: var(--white);
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  border-color: transparent;
`;

export const Text = styled.label`
  cursor: pointer;
  font-size: 16px;
`;

export const DivLoading = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    font-size: 40px;
    font-weight: 400;
  }
`;
export const TextLoading = styled.h2`
  font-weight: 400;
`;
export const DivError = styled.div`
  margin: 20% auto 0;
  text-align: center;
`;
export const TextError = styled.h2`
  font-weight: 400;
`;

export const DivData = styled.div`
  margin: 30px 5%;
`;

export const AssetsTitle = styled.h2``;
export const ButtonAdd = styled.button``;

export const DivPagination = styled.div`
  margin-top: 30px;
  text-align: center;
`;
