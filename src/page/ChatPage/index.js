import { useContext, useEffect, useState } from 'react';
import {
  DivContainerChat,
  RowContainer,
  ColContainer,
  DivLeft,
  DivRight,
  DivLeftItem,
  ListChat,
  ItemChat,
  LeftItem,
  RightItem,
  DivHeader,
  ListMessage,
  ItemMessage,
  FormChat,
  ButtonChat,
  DivContentChat,
  TextUser,
  TextUserResponse,
  DivItemChat,
  DivItemChatUser,
  ChatItemContent,
  DivInfo,
  DivRightItem,
  LeftHeaderItem,
  RightHeaderItem,
  DivOutRoom,
  ButtonOutRoom,
  DivAvatar,
  DivText,
  DivTextUser,
  DivAvatarUser,
  DivInfoOut,
  ButtonInfo,
} from './styles';
import { Popconfirm } from 'antd';
import { SendOutlined, LogoutOutlined } from '@ant-design/icons';
import ChildrenContext from '../../contexts/ChildrenContext';
import { RoleContext } from '../../contexts/UserContext';
import { API_UPDATE_MESSAGE, API_UPDATE_OFF_MESSAGE } from '../../configs/apis';
import LoadingComponent from '../../components/LoadingComponent';

function ChatPage() {
  const {
    listChat,
    socket,
    setMessage,
    message,
    isLoading,
    input,
    setInput,
    chooseChat,
    setChooseChat,
    setListChat,
    visible,
    handleOutRoom,
  } = useContext(ChildrenContext);

  const { userInfo } = useContext(RoleContext);

  useEffect(() => {}, [listChat, socket, message]);

  const handleSubmitChat = async (e, roomId) => {
    e.preventDefault();
    const data = {
      input: input[roomId],
      userId: userInfo.userId,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
      avatar: userInfo.avatarUser,
    };
    setMessage((prev) => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), data],
    }));
    setInput((prev) => ({
      ...prev,
      [roomId]: '',
    }));
    socket.emit('chatCustomer', data);
    socket.off('chatCustomer');
    await fetch(API_UPDATE_MESSAGE + '/' + roomId, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onConfirm = async (e, roomId) => {
    socket.emit('leaveRoom', roomId);
    socket.off('leaveRoom');
    setMessage((prev) => {
      let newMessage = { ...prev };
      delete newMessage[roomId];
      return newMessage;
    });
    setListChat((prev) => prev.filter((item) => item.roomId !== roomId));
    if (listChat.length - 1 > 0) {
      setChooseChat(listChat[0].roomId);
    } else {
      setChooseChat();
    }
    await fetch(API_UPDATE_OFF_MESSAGE + '/' + roomId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const onCancel = (e) => {};

  const handleChooseChat = (id) => {
    setChooseChat(id);
  };

  return (
    <DivContainerChat>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <RowContainer>
          <ColContainer span={8}>
            <DivLeft>
              <h2>Chat message</h2>
              <ListChat>
                {listChat && listChat.length > 0 ? (
                  listChat.map((item, id) => {
                    return (
                      <ItemChat key={id}>
                        <DivLeftItem
                          onClick={() => handleChooseChat(item.roomId)}
                          className={
                            chooseChat === item.roomId ? 'background-chat' : ''
                          }>
                          <LeftItem>
                            <img
                              src={item.userInfo.avatarUser.url}
                              alt={item.userInfo.avatarUser.imageId}
                            />
                          </LeftItem>
                          <RightItem>
                            <p>
                              {item.userInfo.firstName +
                                ' ' +
                                item.userInfo.lastName}
                            </p>
                            {message[item.roomId] &&
                              message[item.roomId].length > 0 && (
                                <p>
                                  {
                                    message[item.roomId][
                                      message[item.roomId].length - 1
                                    ].input
                                  }
                                </p>
                              )}
                          </RightItem>
                        </DivLeftItem>
                      </ItemChat>
                    );
                  })
                ) : (
                  <DivInfo>
                    <h3>No Conversations</h3>
                  </DivInfo>
                )}
              </ListChat>
            </DivLeft>
          </ColContainer>
          <ColContainer span={16}>
            <DivRight>
              <ListMessage>
                {listChat && listChat.length > 0 ? (
                  listChat.map((item, id) => {
                    return (
                      chooseChat === item.roomId && (
                        <ItemMessage key={id}>
                          {visible[item.roomId] && (
                            <DivInfoOut>
                              <div>
                                <p>This chat session has been ended</p>
                                <ButtonInfo
                                  onClick={() => handleOutRoom(item.roomId)}>
                                  Oke
                                </ButtonInfo>
                              </div>
                            </DivInfoOut>
                          )}
                          <DivHeader>
                            <DivRightItem>
                              <LeftHeaderItem>
                                <img
                                  src={item.userInfo.avatarUser.url}
                                  alt={item.userInfo.avatarUser.imageId}
                                />
                              </LeftHeaderItem>
                              <RightHeaderItem>
                                <p>
                                  {item.userInfo.firstName +
                                    ' ' +
                                    item.userInfo.lastName}
                                </p>
                              </RightHeaderItem>
                            </DivRightItem>
                            <DivOutRoom>
                              <Popconfirm
                                title="Out room chat"
                                description="Are you sure to leave this room?"
                                onConfirm={(e) => onConfirm(e, item.roomId)}
                                onCancel={onCancel}
                                okText="Yes"
                                cancelText="No">
                                <ButtonOutRoom>
                                  <LogoutOutlined />
                                </ButtonOutRoom>
                              </Popconfirm>
                            </DivOutRoom>
                          </DivHeader>
                          <DivContentChat>
                            <ChatItemContent>
                              <div>
                                {message[item.roomId] &&
                                  message[item.roomId].length > 0 &&
                                  message[item.roomId].map((itemMes, id) => {
                                    return itemMes.userId ===
                                      userInfo.userId ? (
                                      <DivItemChat>
                                        <DivTextUser>
                                          <TextUser
                                            key={id}
                                            style={{ color: '#000' }}>
                                            <span>{itemMes.input}</span>
                                          </TextUser>
                                          <p>You {itemMes.time}</p>
                                        </DivTextUser>
                                        <DivAvatarUser>
                                          <img
                                            src={itemMes.avatar.url}
                                            alt={itemMes.avatar.imageId}
                                          />
                                        </DivAvatarUser>
                                      </DivItemChat>
                                    ) : (
                                      <DivItemChatUser>
                                        <DivAvatar>
                                          <img
                                            src={itemMes.avatar.url}
                                            alt={itemMes.avatar.imageId}
                                          />
                                        </DivAvatar>
                                        <DivText>
                                          <TextUserResponse
                                            key={id}
                                            style={{ color: '#000' }}>
                                            <span>{itemMes.input}</span>
                                          </TextUserResponse>
                                          <p>
                                            {`${itemMes.firstName} ${itemMes.lastName}`}{' '}
                                            {itemMes.time}
                                          </p>
                                        </DivText>
                                      </DivItemChatUser>
                                    );
                                  })}
                              </div>
                            </ChatItemContent>
                            <FormChat
                              onSubmit={(e) =>
                                handleSubmitChat(e, item.roomId)
                              }>
                              <input
                                name="search"
                                placeholder="Enter chat message"
                                value={input[item.roomId] || ''}
                                onChange={(e) =>
                                  setInput((prev) => ({
                                    ...prev,
                                    [item.roomId]: e.target.value,
                                  }))
                                }
                              />
                              <ButtonChat type="submit">
                                <SendOutlined />
                              </ButtonChat>
                            </FormChat>
                          </DivContentChat>
                        </ItemMessage>
                      )
                    );
                  })
                ) : (
                  <DivInfo>
                    <h3>There are no conversations available at the moment.</h3>
                  </DivInfo>
                )}
              </ListMessage>
            </DivRight>
          </ColContainer>
        </RowContainer>
      )}
    </DivContainerChat>
  );
}

export default ChatPage;
