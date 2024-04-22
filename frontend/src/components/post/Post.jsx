import { MoreVert } from '@mui/icons-material';
import React, { useState, useEffect, useContext } from 'react';
import '../../static/css/post.css';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import Img from '../img/Img';

export default function Post({ post }) {
    // returnの上側だったらjsのコードを書いて良い
    // const user = Users.filter(user => user.id === post.userId)[0];
    // 「いいね」が押された場合、＋1する
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState([]);
    const {user: currentUser} = useContext(AuthContext);

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;
  
    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get(BACKEND_API + "/users/get?userId=" + post.userId);
        setUser(response.data);
        };
        fetchUser();
        // [post.userId]を格納することで、userIdが変わるごとにuseEffectが発火する
    }, [post.userId]);

    const handleLike = async () => {
        // setLike(post.likes.includes(user._id) ? like - 1 : like + 1);
        setLike((post.likes.includes(user._id) && isLiked) || (!post.likes.includes(user._id) && !isLiked) ? like + 1 : like - 1);
        setIsLiked(!isLiked);
        try {
            await axios.put(BACKEND_API + "/posts/like/" + post._id, {userId: currentUser._id});
        } catch (err) {
            console.log(err)
        }
    };

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postLeft">
                    <Link to={"/profile/" + user.username}>
                        <img src={user.profilePicture 
                            ? PUBLIC_FOLDER + user.profilePicture 
                            : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postRight">
                    <MoreVert className="moreVert" />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.description}</span>
                {post.img ? <Img picture={PUBLIC_FOLDER + post.img} /> : ""}
                {/* <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" /> */}
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className="likeIcon" onClick={() => handleLike()} />
                    <span className="postLikeCounter">{like}人がいいねを押しました</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}:コメント</span>
                </div>
            </div>
        </div>
    </div>
  )
}
