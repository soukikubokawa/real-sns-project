import React from 'react'
import '../../static/css/search.css'

export default function Search({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="searchContainer">
        <img src={user.profilePicture 
            ? PUBLIC_FOLDER + user.profilePicture 
            : PUBLIC_FOLDER + 'person/noAvatar.png'} alt="" className="searchInputPicture" />
        <span className="searchInputName">{user.username}</span>
    </div>
  )
}

