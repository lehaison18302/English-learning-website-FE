import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      //console.log(user);
      // Chuyển hướng về trang trước đó hoặc trang home sau khi đăng nhập thành công
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userData = {...user};
      if (userDocSnap.exists()) {
        const firestoreData = userDocSnap.data();
        userData = {
          ...user,
          ...firestoreData
        };
      }
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/user-not-found") {
        setError("Không tìm thấy tài khoản với email này!");
      } else if (err.code === "auth/wrong-password") {
        setError("Mật khẩu không đúng!");
      } else if (err.code === "auth/invalid-email") {
        setError("Email không hợp lệ!");
      } else if (err.code === "auth/too-many-requests") {
        setError("Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau!");
      } else {
        setError(`Lỗi đăng nhập: ${err.message}`);
      }
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
