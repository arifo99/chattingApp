import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client";
import NameBox from './components/NameBox';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});

  const [socketManager, setSocketManager] = useState(null);

  useEffect(() => {
    if(socketManager != null)
      return;

    var newSocket = io("http://localhost:9000");
    
    newSocket.on('new_message', (sender, message) => {
      setMessages((prevState) => {
        var newState = JSON.parse(JSON.stringify(prevState));
        if(newState[sender] == null)
          newState[sender] = [];
        newState[sender].push({'text': message, 'sent': false});
        return newState;
      })
    })

    setSocketManager(newSocket);
  })

  useEffect(() => {
    if(name.length == 0)
      return;

    socketManager.emit('new_user', name);
  }, [name])

  return (
    <div className="App">
      {name.length == 0? <NameBox setName={setName}/>: <ChatBox name={name} contacts={contacts} setContacts={setContacts} messages={messages} setMessages={setMessages} socketManager={socketManager}/>}
    </div>
  );
}

export default App;
