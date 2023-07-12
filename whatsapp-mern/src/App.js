import './App.css';
import Sidebar from './Sidebar'
import Chat from './chat'
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from './axios'
//for material ui
// npm install @material-ui/core
// npm install @material-ui/icon
// npm install @mui/material @emotion/react @emotion/styled


function App() {

  const [messages, setMessages] = useState([]);

  //npm i axios
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      // console.log(response.data);
      setMessages(response.data);
    });
  }, []);

// it loads the server once
//we  have installed npm i pusher-js
  useEffect(() => {
    const pusher = new Pusher('6e06ef754dc6cac41498', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]); //[] ke andar dependicies aati hain

  console.log(messages);

  return (
      // BEM Naming Convention
      <div className="app">
        <div className="app_body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      </div>
  );
}

export default App;
