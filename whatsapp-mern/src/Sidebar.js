// using rfce shortcut
import './Sidebar.css'
import SettingsIcon  from '@mui/icons-material/Settings';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat'
import { useEffect, useState } from 'react';
import { SettingsEthernetRounded } from '@material-ui/icons'; 


function Sidebar() {
  const [rooms, setRooms] = useState([]);

  // [] means it would run only once by taking snapshot and whenever there is change in the doc another time snapshot is taken and placed by this browser is not slow any more
  // useEffect(() => {
  //   db.collections('room').onSnapshot(snapshot =>
  //     (
  //       setRooms(snapshot.docs.map(doc => 
  //         ({
  //           id: doc.id,
  //           data: doc.data()
  //         })
  //         ))
  //     ))
  // }, [])


  return (
    <div class = "Sidebar">
      <div class="Sidebar_header">
      <Avatar />
      
        <div className="Sidebar_headerRight">
          <IconButton>
          <DonutLargeIcon />
          </IconButton>
          <IconButton>
          <ChatIcon />
          </IconButton>
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>

      </div>

      <div class="Sidebar_search">
      <div className="sidebar_searchContainer">
        <SearchIcon />
        <input type="text" placeholder='Search or Start new Chat'/>
      </div>
      </div>

      <div class="Sidebar_chats">
        <SidebarChat addnewChat/>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>

    </div>
  )
}

export default Sidebar
