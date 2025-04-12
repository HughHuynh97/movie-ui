import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password
            });
            
            console.log("Đăng nhập thành công:", res.data);
            
            // Lưu token vào localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            
            // Thông báo đăng nhập thành công
            alert("Đăng nhập thành công!");
            
            // Chuyển hướng đến trang chủ
            navigate("/");
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            
            let errorMessage = "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.";
            
            if (err.response) {
                errorMessage = err.response.data.message || errorMessage;
                console.log("Lỗi từ server:", err.response.data);
            } else if (err.request) {
                errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối.";
                console.log("Không nhận được phản hồi:", err.request);
            }
            
            setError(errorMessage);
        }
    };

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="container">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    
                    {error && <div className="error" style={{color: "red", marginBottom: "10px"}}>{error}</div>}
                    
                    <input 
                        type="email" 
                        placeholder="Email or phone number" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button className="loginButton" type="submit">Sign In</button>
                    <span>
                        New to Netflix? <Link to="/register"><b>Sign up now.</b></Link>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
}