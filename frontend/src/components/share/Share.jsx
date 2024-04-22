import React, { useContext, useRef, useState } from 'react'
import '../../static/css/share.css'
import { Analytics, Face, Gif, Image } from '@mui/icons-material'
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';

export default function Share() {
    const  { user } = useContext(AuthContext);
    const description = useRef();
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;

    const [file, setFile] =useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = {
                userId: user._id,
                description: description.current.value
            };
            if (file) {
                const data = new FormData();
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                newPost.img = fileName;

                await axios.post(BACKEND_API + "/upload", data)
            }
            await axios.post(BACKEND_API + "/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="share">
        <form className="shareWrapper" onSubmit={(e) => handleSubmit(e)}>
            <div className="shareTop">
                <img src={user.profilePicture 
                    ? PUBLIC_FOLDER + user.profilePicture 
                    : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="shareProfileImg" />
                <textarea name="shareInput" rows="3" cols="75" placeholder="投稿内容" ref={description} ></textarea>
            </div>
            <hr className="shareHr"></hr>
            <div className="shareButtons">
                <div className="shareOptions">
                    <label className="shareOption" htmlFor="file">
                        <Image className="shareIcon" htmlColor="blue" />
                        <span className="shareOptionText">写真</span>
                        <input type="file" id="file" accept=".png, .jpeg, .jpg" style={{ display:"none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <div className="shareOption">
                        <Gif className="shareIcon" htmlColor="pink" />
                        <span className="shareOptionText">GIF</span>
                    </div>
                    <div className="shareOption">
                        <Face className="shareIcon" htmlColor="green" />
                        <span className="shareOptionText">気持ち</span>
                    </div>
                    <div className="shareOption">
                        <Analytics className="shareIcon" htmlColor="red" />
                        <span className="shareOptionText">投稿</span>
                    </div>
                </div>
                <button type="submit" className="shareButton">投稿</button>
            </div>
        </form>
    </div>
  )
}
