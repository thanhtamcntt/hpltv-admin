import {
  ModalDetail,
  DivTitle,
  TitleDetail,
  VideoDetail,
  DivVideo,
  DivInfoDetail,
  InfoDetail,
  DivImage,
  InfoItem,
} from './styles';

import dayjs from 'dayjs';
import { Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailAssets({ setIsModalDetail, isModalDetail, asset, type }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (asset) {
      setData(asset);
    }
  }, [asset]);

  const handleOk = () => {
    setIsModalDetail(false);
  };
  const handleCancel = () => {
    setIsModalDetail(false);
  };

  if (!asset || !data) {
    return (
      <ModalDetail
        title={type === 'category' ? 'Detail Category' : 'Detail Asset'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  if (type === 'movies' && !data && !data.videoUrl && !data.videoUrl.url) {
    return (
      <ModalDetail
        title={type === 'category' ? 'Detail Category' : 'Detail Asset'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      className="detail-assets"
      title={type === 'category' ? 'Detail Category' : 'Detail Asset'}
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <DivTitle>
        {type === 'category' ? (
          <TitleDetail>Name category : {data.name}</TitleDetail>
        ) : (
          <TitleDetail>Name film : {data.title}</TitleDetail>
        )}
      </DivTitle>
      {type !== 'category' && (
        <>
          {type === 'movies' && (
            <DivVideo>
              <VideoDetail>
                <iframe
                  width="100%"
                  height="400"
                  title={data.title}
                  src={data.videoUrl.url}
                  frameBorder="0"
                  style={{ borderRadius: '20px' }}
                  allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
              </VideoDetail>
            </DivVideo>
          )}
          <DivInfoDetail>
            <InfoDetail>
              <h2>Information Detail</h2>
              <InfoItem>Description: {data.description}</InfoItem>
              {type === 'movies' && (
                <InfoItem>Director: {data.director}</InfoItem>
              )}
              {type === 'movies' && <InfoItem>Cast: {data.cast}</InfoItem>}
              {type === 'movies' && (
                <InfoItem>Duration: {data.duration} minute</InfoItem>
              )}
              {type === 'movies' && (
                <InfoItem>Country: {data.country}</InfoItem>
              )}

              <InfoItem>Rating: {data.rating}/5</InfoItem>
              {type === 'movies' && (
                <InfoItem>
                  Release Date: {dayjs(data.releaseDate).format('DD-MM-YYYY')}
                </InfoItem>
              )}
              {type === 'movies' && (
                <InfoItem>Product Company: {data.productCompany}</InfoItem>
              )}

              <InfoItem>
                Create At: {dayjs(data.createAt).format('DD-MM-YYYY')}
              </InfoItem>
            </InfoDetail>
            <DivImage>
              <h2>Image Film</h2>
              <Image
                width={260}
                height={360}
                src={data.imageUrl.url}
                alt={data.title}
              />
            </DivImage>
          </DivInfoDetail>
        </>
      )}
    </ModalDetail>
  );
}

export default memo(ModalDetailAssets);
