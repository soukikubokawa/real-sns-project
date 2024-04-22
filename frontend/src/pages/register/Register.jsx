import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../static/css/register.css';
import axios from 'axios';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmedPassword = useRef();

    const BACKEND_API = process.env.REACT_APP_BACKEND_API;

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        // console.log(password.current.value);
        if (password.current.value !== confirmedPassword.current.value) {
            confirmedPassword.current.setCustomValidity("パスワードが違います");
        } else {
            try {
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value
                };
                await axios.post(BACKEND_API + "/users/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }
  return (
    <div className="loginContainer">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginTitle">Real SNS</h1>
                <span className="loginTitleText">本格的なSNSを、自分の手で。</span>
            </div>
            <div className="loginRight">
                <span className="loginRightText">新規登録はこちら</span>
                <form className="loginForm" onSubmit={(e) => handleClick(e)}>
                    <input type="text" className="userInfo" placeholder="ユーザ名" ref={username} required />
                    <input type="email" className="userInfo" placeholder="Eメール" ref={email} required />
                    <input type="password" className="userInfo" placeholder="パスワード" ref={password} minLength={8} required />
                    <input type="password" className="userInfo" placeholder="確認用パスワード" ref={confirmedPassword} required />
                    <button type="submit" className="userSignUp">サインアップ</button>
                </form>
                <Link to={"/login"}>
                    <button className="login">ログイン</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
