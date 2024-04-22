import { Chat, Notifications, Search } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import "../../static/css/topbar.css";
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchList from '../searchList/SearchList';

export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND_API = process.env.REACT_APP_BACKEND_API;
  const [users, setUsers] = useState([]);

  const handleInput = async (e) => {
    var usersData = [];
    try {
      const search = document.getElementById("search").value;
      if (search) {
        const response = (await axios.get(BACKEND_API + "/users/get/all")).data;
        response.map((userData) => {
          if (userData.username.includes(search)) {
            usersData.push(userData);
          }
          return setUsers(usersData);
        });
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Real SNS</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input type="text" 
            className="searchInput" 
            placeholder='検索...'
            id="search"
            onInput={(e) => handleInput(e)}
          />
        </div>
        {users.length ? <SearchList users={users} /> : ""}
      </div>
      <div className="topbarRight">
        <div className="topbarIconItem">
          <Chat />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Notifications />
          <span className="topbarIconBadge">2</span>
        </div>
      </div>
      <Link to={"/profile/" + user.username}>
        <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="topbarImg" />
      </Link>
    </div>
  );
}
