import { Bookmark, Home, Login, MessageRounded, Notifications, Person, Settings } from '@mui/icons-material';
import React, { useContext } from 'react';
import '../../static/css/sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Sidebar() {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    // ログアウトを押下
    const handleClick = () => {
        dispatch({type: "LOGIN_START"});
        navigate("/login");
    } 

  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Home className="sidebarIcon" />
                    <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                        <span className="sidebarListItemText">ホーム</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Notifications className="sidebarIcon" />
                    <span className="sidebarListItemText">通知</span>
                </li>
                <li className="sidebarListItem">
                    <MessageRounded className="sidebarIcon" />
                    <span className="sidebarListItemText">メッセージ</span>
                </li>
                <li className="sidebarListItem">
                    <Bookmark className="sidebarIcon" />
                    <span className="sidebarListItemText">ブックマーク</span>
                </li>
                <li className="sidebarListItem">
                    <Person className="sidebarIcon" />
                    <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "black" }}>
                        <span className="sidebarListItemText">プロフィール</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Settings className="sidebarIcon" />
                    <span className="sidebarListItemText">設定</span>
                </li>
                <li className="sidebarListItem">
                    <Login className="sidebarIcon" />
                    <span className="sidebarListItemText" onClick={() => handleClick()}>ログアウト</span>
                </li>
            </ul>
            {/* hrタグで線を引く */}
            <hr className="sidebarHr"></hr>
            <ul className="sidebarFriendList">
                {Users.map((user) => (
                    <CloseFriend user={user} key={user.id} />
                ))}
            </ul>
        </div>
    </div>
  )
}
