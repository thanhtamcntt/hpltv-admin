import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalDetail = styled(Modal)`
  width: 1000px;
`;
export const DivTitle = styled.div`
  text-align: center;
`;
export const TitleDetail = styled.h2``;
export const DivVideo = styled.div``;
export const VideoDetail = styled.div``;
export const DivInfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const InfoDetail = styled.div`
  padding-right: 40px;
  & h2 {
    text-align: left;
    font-size: 20px;
  }
`;
export const InfoItem = styled.p`
  text-align: left;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;
export const DivImage = styled.div`
  & img {
    width: 180px;
    height: 260px;
    border-radius: 20px;
  }

  & h2 {
    text-align: center;
    font-size: 20px;
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
