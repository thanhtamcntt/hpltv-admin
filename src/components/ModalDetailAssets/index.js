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
  DivVideoFilm,
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
      title={
        type === 'category'
          ? 'Detail Category'
          : type !== 'film-for-series' &&
            type !== 'trash-film-for-series' &&
            type !== 'payment'
          ? 'Detail Asset'
          : type !== 'payment'
          ? 'Detail Asset Series ' + data.seriesId.title
          : 'Detail Package'
      }
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <DivTitle>
        {type === 'category' ? (
          <TitleDetail>Name category : {data.name}</TitleDetail>
        ) : type !== 'film-for-series' &&
          type !== 'trash-film-for-series' &&
          type !== 'payment' ? (
          <TitleDetail>Name film : {data.title}</TitleDetail>
        ) : type !== 'payment' ? (
          <TitleDetail>Episode {data.filmSerialNumber}</TitleDetail>
        ) : (
          <TitleDetail>
            Information about customers purchasing packages
          </TitleDetail>
        )}
      </DivTitle>
      {type !== 'category' &&
        type !== 'film-for-series' &&
        type !== 'trash-film-for-series' && (
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
                <h2>Information Detail </h2>
                {type !== 'payment' && (
                  <InfoItem>Description: {data.description}</InfoItem>
                )}
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

                {type !== 'payment' && (
                  <InfoItem>Rating: {data.rating}/5</InfoItem>
                )}
                {type === 'movies' && (
                  <InfoItem>
                    Release Date: {dayjs(data.releaseDate).format('DD-MM-YYYY')}
                  </InfoItem>
                )}
                {type === 'movies' && (
                  <InfoItem>Product Company: {data.productCompany}</InfoItem>
                )}
                {type === 'payment' && (
                  <>
                    <InfoItem>
                      Username: {data.userId.firstName} {data.userId.lastName}
                    </InfoItem>
                    <InfoItem>Email: {data.userId.email}</InfoItem>
                    <InfoItem>Phone number: {data.userId.phoneNumber}</InfoItem>
                    <InfoItem>Package type in use: {data.typePack}</InfoItem>
                    <InfoItem>Monthly price: ${data.monthlyPrice}</InfoItem>
                  </>
                )}

                <InfoItem>
                  Created At: {dayjs(data.createAt).format('DD-MM-YYYY')}
                </InfoItem>
                {type === 'payment' && (
                  <InfoItem>
                    Expiration date:{' '}
                    {dayjs(data.expirationDate).format('DD-MM-YYYY')}
                  </InfoItem>
                )}
              </InfoDetail>
              <DivImage>
                <h2>{type !== 'payment' ? 'Image Film' : 'Image user'}</h2>
                <Image
                  width={300}
                  height={300}
                  src={
                    data && data.userId && data.userId.avatarUser.url
                      ? data.userId.avatarUser.url
                      : data.imageUrl.url
                  }
                  alt={data.title || 'image user'}
                />
              </DivImage>
            </DivInfoDetail>
          </>
        )}
      {type === 'trash-film-for-series' ||
        (type === 'film-for-series' && (
          <DivVideoFilm>
            <VideoDetail>
              <iframe
                width="100%"
                height="400"
                title={data.filmSerialNumber}
                src={data.videoUrl.url}
                frameBorder="0"
                style={{ borderRadius: '20px' }}
                allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </VideoDetail>
          </DivVideoFilm>
        ))}
    </ModalDetail>
  );
}

export default memo(ModalDetailAssets);
