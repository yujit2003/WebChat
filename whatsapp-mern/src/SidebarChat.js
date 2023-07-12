import React ,{ useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar,} from '@mui/material';



function SidebarChat({addnewChat}) {
    const [seed, setSeed] = useState("");
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);
    const createChat = ()=> {
        const roomName = prompt('Please enter the User Name of the Chat');

        if(roomName) {
            //do some clever stuf ..........
        }
    }
  

  return !addnewChat ? (
    <div className='SidebarChat'>
      <Avatar src = {`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />
      <div className="SidebarChat_info">
        <h2>Name</h2>
        <p>Last Message sent was...</p>
      </div>
    </div>
  ): (
    <div onClick ={createChat} className="SidebarChat">
        <h2> Add New Chat</h2>
    </div>
  );
}
export default SidebarChat
