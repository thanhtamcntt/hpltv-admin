import { useEffect, useState } from 'react';
import {
  DivContainerChat,
  DivContent,
  FormChat,
  ButtonChat,
  DivContentChat,
  TitleChat,
  ChatContent,
  DivListChat,
  DivJoinRoom,
  Text,
  ButtonJoinChat,
} from './styles';
import { SendOutlined } from '@ant-design/icons';
import { io } from 'socket.io-client';

function ChatPage() {
  const [socket, setSocket] = useState();
  const [input, setInput] = useState();
  const [listChat, setListChat] = useState([]);
  const [message, setMessage] = useState([]);
  const [openChat, setOpenChat] = useState([]);

  useEffect(() => {
    console.log('..');
    const newSocket = io('http://localhost:4000/admin');

    setSocket(newSocket);
    newSocket.on('chatCustomer', (newMessage) => {
      console.log(newMessage);
      setMessage((prev) => [...prev, newMessage]);
    });
    newSocket.on('room', (data) => {
      console.log('data ', data);
      setListChat((prev) => [...prev, data]);
    });

    return () => {
      // newSocket.off('chatCustomer');
      // newSocket.off('receiveRoom');
      newSocket.disconnect();
    };
  }, [message]);

  const handleSubmitChat = (e) => {
    e.preventDefault();
    console.log('submitChat');
    setMessage((prev) => [...prev, input]);

    if (socket) {
      socket.emit('chatCustomer', input);
      socket.off('chatCustomer');
    }
  };

  const handleJoinChat = (id) => {
    if (socket) {
      socket.emit('joinRoom', id);
      socket.off('joinRoom');
    }

    setOpenChat((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DivContainerChat>
      <DivListChat>
        {listChat &&
          listChat.length > 0 &&
          listChat.map((item, id) => {
            return (
              <>
                {!openChat[item.roomId] ? (
                  <DivJoinRoom key={id}>
                    <Text>{item.nameUser}</Text>
                    <Text>{item.issues}</Text>
                    <ButtonJoinChat onClick={() => handleJoinChat(item.roomId)}>
                      Join Chat
                    </ButtonJoinChat>
                  </DivJoinRoom>
                ) : (
                  <DivContentChat>
                    <TitleChat>Live chat</TitleChat>
                    <ChatContent></ChatContent>
                    <FormChat onSubmit={handleSubmitChat}>
                      <input
                        name="search"
                        placeholder="Enter chat message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <ButtonChat type="submit">
                        <SendOutlined />
                      </ButtonChat>
                    </FormChat>
                  </DivContentChat>
                )}

                <DivContent></DivContent>
              </>
            );
          })}
      </DivListChat>
    </DivContainerChat>
  );
}

export default ChatPage;
