import styled from 'styled-components';

export const DivAssets = styled.div`
  margin: 30px 0;
  text-align: left;
  & button {
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 18px 36px;
    font-weight: 500;
  }
`;
export const DivAction = styled.div`
  display: flex;
  margin-left: 5%;
  & button:nth-child(2) {
    margin-left: 20px;
  }
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
