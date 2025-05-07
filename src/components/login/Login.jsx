import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // import file CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/user-not-found") {
        setError("Không tìm thấy tài khoản với email này!");
      } else if (err.code === "auth/wrong-password") {
        setError("Mật khẩu không đúng!");
      } else if (err.code === "auth/invalid-email") {
        setError("Email không hợp lệ!");
      } else {
        setError(`Lỗi đăng nhập: ${err.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>
        <p className="login-subtitle">Hãy đăng nhập để tiếp tục sử dụng</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>

        <div className="login-forgot">
          <a href="/forgot">Quên mật khẩu?</a>
        </div>

        <hr className="login-divider" />

        <div className="login-register">
          <a href="/register" className="register-button">
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
