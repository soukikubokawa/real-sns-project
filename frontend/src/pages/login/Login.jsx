import React, { useContext, useRef } from 'react'
import '../../static/css/login.css'
import { loginCall } from '../../ActionCalls';
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        // console.log(password.current.value);
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch);
    };
  return (
    <div className="loginContainer">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginTitle">Real SNS</h1>
                <span className="loginTitleText">本格的なSNSを、自分の手で。</span>
            </div>
            <div className="loginRight">
                <span className="loginRightText">ログインはこちら</span>
                <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
                    <input type="email" className="userInfo" placeholder="Eメール" ref={email} required />
                    <input type="password" className="userInfo" placeholder="パスワード" ref={password} minLength={8} required />
                    <button type="submit" className="userLogin">ログイン</button>
                </form>
                <a href="https://" className="forgetPassword">パスワードを忘れた方へ</a>
                <Link to={"/"}>
                    <button className="createAccount">アカウント作成</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
