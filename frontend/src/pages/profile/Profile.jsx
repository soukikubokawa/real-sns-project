import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/Timeline';
import Rightbar from '../../components/rightbar/Rightbar';
import '../../static/css/profile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState({});
    const userId = useParams().userId;
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  
    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get(BACKEND_API + "/users/get/" + userId);
        setUser(response.data);
        };
        fetchUser();
    });

  return (
    <>
    <Topbar />
    <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + 'post/3.jpeg'} alt="" className="profileCoverImg" />
                    <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + 'person/noAvatar.png'} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <span className="profileInfoName">{user.username}</span>
                    <span className="profileInfoDesc">{user.description}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Timeline userId={userId} />
                <Rightbar user={user} />
            </div>
        </div>
    </div>
    </>
  )
}
