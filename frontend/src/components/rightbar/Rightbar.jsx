import React from 'react'
import '../../static/css/rightbar.css'
import Online from '../online/Online'
import { Users } from '../../dummyData'

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  function homeRightbar() {
    return (
      <>
      <div className="eventContainer">
        <img src={PUBLIC_FOLDER + "star.png"} alt="" className="starImg" />
        <span className="eventText">
          <b>フォロワー限定</b>イベント開催中！
        </span>
      </div>
      <img src="/assets/ad.jpeg" alt="" className="eventImg" />
      <h4 className="rightbarTitle">オンラインの友達</h4>
      <ul className="rightbarFriendList">
        {Users.map((user) => (
          <Online user={user} key={user.id} />
        ))}
      </ul>
      <p className="promotionTitle">プロモーション広告</p>
      <img src={PUBLIC_FOLDER + "promotion/promotion1.jpeg"} alt="" className="promotionImg" />
      <p className="promotionName">ショッピング</p>
      <img src={PUBLIC_FOLDER + "promotion/promotion2.jpeg"} alt="" className="promotionImg" />
      <p className="promotionName">カーショップ</p>
      <img src={PUBLIC_FOLDER + "promotion/promotion3.jpeg"} alt="" className="promotionImg" />
      <p className="promotionName">株式会社kaihatsu</p>
    </> 
    )
  };

  function profileRightbar() {
    return (
      <>
      <div className="rightbarTitle">ユーザ情報</div>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">出身：</span>
          <span className="rightbarInfoKey">神奈川</span>
        </div>
        <div className="rightbarTitle">あなたの友達</div>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "person/1.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFllowingName">aaaaa</span>
          </div>  
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "person/2.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFllowingName">aaaaa</span>
          </div>  
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "person/3.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFllowingName">aaaaa</span>
          </div>  
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "person/4.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFllowingName">aaaaa</span>
          </div>  
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "person/5.jpeg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFllowingName">aaaaa</span>
          </div>  
        </div>
      </div>
      </>
    )
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? profileRightbar() : homeRightbar()}
      </div>
    </div>
  );
}
