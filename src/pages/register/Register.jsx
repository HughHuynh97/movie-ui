import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [_password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleStart = () => {
        setName(nameRef.current.value);
        setEmail(emailRef.current.value);
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        const passwordValue = passwordRef.current.value;
        setPassword(passwordValue);

        try {
            const res = await axios.post("/api/auth/register", {
                username: name,
                email: email,
                password: passwordValue
            });
            
            console.log("Phản hồi từ server:", res.data);
            alert("Đăng ký thành công!");
            
            window.location.href = "/login";
        } catch (err) {
            console.error("Lỗi:", err);
            
            let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
            
            if (err.response) {
                errorMessage = err.response.data.message || errorMessage;
                console.log("Lỗi từ server:", err.response.data);
            } else if (err.request) {
                errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối.";
                console.log("Không nhận được phản hồi:", err.request);
            }
            
            setError(errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="logo"
                    />
                    <Link to="/login">
                        <button className="loginButton">Sign In</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your name and email to create or restart your membership.
                </p>

                {error && <div className="error-message" style={{color: "red", marginBottom: "10px"}}>{error}</div>}

                {!email ? (
                    <div className="input">
                        <input type="text" placeholder="Full name" ref={nameRef} required />
                        <input type="email" placeholder="Email address" ref={emailRef} required />
                        <button className="registerButton" onClick={handleStart}>
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input" onSubmit={handleFinish}>
                        <input type="password" placeholder="Password" ref={passwordRef} required />
                        <button className="registerButton" type="submit">
                            Start
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
