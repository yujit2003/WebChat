import React ,{ useState, useEffect } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from './axios'


import "./Chat.css"
import { SearchOutlined } from '@material-ui/icons';

function Chat({ messages }) {
  const [input, setInput] = useState("")
  const [seed, setSeed] = useState("");
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = async (e) => {
      console.log("afaf");
      e.preventDefault();
      await axios.post("/messages/new", {
        message: input,
        name: "Yujit",
        timestamp: "Just Now",
        received: true
      });
      setInput("");
    };

  return (
    <div className = "chat">
      <div className="chat_header">
        <Avatar src = {`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>
        <div className="chat_headerInfo">
          <h3>User Name</h3>
          <p>Laast Seen at...</p>
        </div>
        <div className="chat_headerRight">
            <IconButton>
            <SearchOutlined />
            </IconButton>
            <IconButton>
            <AttachFileIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />
            </IconButton>
        </div>
      </div>
        <div className="chat_body">
          {messages.map((message) =>(
            <p className={`chat_message  ${message.received && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
              {message.message}
            <span className="chat_timespan">{message.timestamp}</span>
            </p>
          ))}

        </div>
        <div className="chat_footer">
          <InsertEmoticonIcon />
          <form action="Submit" value>
            <input type="text" value={input} onChange = {(e) => setInput(e.target.value)} placeholder='Type a message...'/>
            <button onClick={sendMessage} type = "Submit">Send a message...</button>
          </form>
          <MicIcon />
        </div>
    </div>
  )
}

export default Chat
